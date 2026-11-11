import { Engine } from '../../engine/engine';
import { DetectionResult } from '../../model/detection-result';
import { PhishingRules } from '../../model/phishing-rules';
import { CommunityLoader } from '../../community/community-loader';
import { IStorage } from './i-storage';
import { BadgeScorer } from './badge-scorer';
import { isHttpUrl } from './util/url-util';
import { isWhitelistedUrl } from './util/whitelist';

interface TabState {
  tabId: number;
  url: string;
  detectionResults?: DetectionResult[];
  redirecting?: boolean;
}

export class PhishingDetectionPlugin {
  private _rules: PhishingRules[] = [];
  private _communityUrls: string[] = [];
  private _whitelistedUrls: string[] = [];
  private readonly _tabStates = new Map<number, TabState>();
  private readonly _tabUpdateVersions = new Map<number, number>();
  private readonly _ready: Promise<void>;

  constructor(
    private _storage: IStorage,
    private _browserImpl: typeof chrome | typeof browser,
    private _communityLoader = new CommunityLoader()
  ) {
    // Load the persisted state first, but register the listeners immediately.
    // Chrome MV3 service workers are stopped when idle and restarted on the
    // next event; listeners must therefore be registered synchronously at the
    // top level (see chrome-plugin.ts).
    this._ready = this.initializeState();
    this.registerListeners();
    this.loadCommunityUrls();
    this.initializeOpenTabs();
  }

  /**
   * Resolves when the rules and whitelist have been loaded from storage.
   */
  whenReady(): Promise<void> {
    return this._ready;
  }

  private registerListeners(): void {
    /**
     * When a tab is removed by the user.
     */
    this._browserImpl.tabs.onRemoved.addListener((tabId: number) => {
      this._tabStates.delete(tabId);
      this._tabUpdateVersions.delete(tabId);

      // Something may have been changed in the settings or whitelist.
      void this.loadRules();
      void this.refreshWhitelistedUrls();
    });

    /**
     * When a tab is activated by the user (opened for the first time, or
     * opened again after selecting it). The phishing detection itself happens
     * in the onUpdated event. Here we only update the popup and close
     * previously blocked tabs, so the user cannot accidentally interact with
     * them anymore.
     */
    this._browserImpl.tabs.onActivated.addListener(activeInfo => {
      return this.handleTabActivated(activeInfo.tabId);
    });

    /**
     * When the content of a tab is updated. This is the ONLY place where the
     * plugin checks for phishing attempts.
     */
    this._browserImpl.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
      return this.handleTabUpdated(tabId, changeInfo, tab);
    });

    /**
     * When a tab is created. We create an initial state to update in later
     * events. Do NOT check for phishing in this stage yet.
     */
    this._browserImpl.tabs.onCreated.addListener(tab => {
      if (tab.id === undefined) {
        return;
      }
      this.getOrCreateTabState(tab.id, tab.url || '');
    });

    /**
     * Keep the in-memory rules and whitelist in sync with changes made from
     * the settings page or the unblock page.
     */
    this._browserImpl.storage?.onChanged?.addListener((changes, areaName) => {
      if (areaName !== 'local' || !changes['settings']) {
        return;
      }
      void this.loadRules();
      void this.refreshWhitelistedUrls();
    });
  }

  private async initializeState(): Promise<void> {
    await Promise.all([this.loadRules(), this.refreshWhitelistedUrls()]);
  }

  private loadRules(): Promise<void> {
    return new Promise(resolve => {
      try {
        this._storage.getRules(rules => {
          if (Array.isArray(rules)) {
            this._rules = rules;
          }
          resolve();
        });
      } catch (error) {
        console.error('Could not load phishing rules', error);
        resolve();
      }
    });
  }

  private refreshWhitelistedUrls(): Promise<void> {
    return new Promise(resolve => {
      try {
        this._storage.getWhitelistedUrls(urls => {
          if (Array.isArray(urls)) {
            this._whitelistedUrls = urls;
          }
          resolve();
        });
      } catch (error) {
        console.error('Could not load whitelisted URLs', error);
        resolve();
      }
    });
  }

  private async getWhitelistedUrlsFromStorage(): Promise<string[]> {
    return new Promise(resolve => {
      try {
        this._storage.getWhitelistedUrls(urls => {
          resolve(Array.isArray(urls) ? urls : []);
        });
      } catch (error) {
        console.error('Could not read whitelisted URLs', error);
        resolve(this._whitelistedUrls);
      }
    });
  }

  private async handleTabActivated(tabId: number): Promise<void> {
    // Refresh the whitelist before deciding which popup to show.
    await this.refreshWhitelistedUrls();

    const activeState = this._tabStates.get(tabId);

    // Close previous phishing/blocked tabs. Never close the tab the user just
    // activated.
    for (const state of Array.from(this._tabStates.values())) {
      if (state.tabId === tabId) {
        continue;
      }
      if (state.detectionResults?.some(result => result.isPhishing)) {
        void this.closeTab(state.tabId);
      }
    }

    if (!activeState || !activeState.detectionResults) {
      this.updateResult('report.html', '--');
      return;
    }

    this.updatePopupForState(activeState);
  }

  private async handleTabUpdated(
    tabId: number,
    changeInfo: { url?: string; status?: string },
    tab: { id?: number; url?: string }
  ): Promise<void> {
    if (tabId === undefined || tabId === null) {
      return;
    }

    // A tab can emit several onUpdated events in quick succession (loading,
    // title, favicon, ...). Only the most recent event may update the state.
    const version = (this._tabUpdateVersions.get(tabId) || 0) + 1;
    this._tabUpdateVersions.set(tabId, version);

    const state = this.getOrCreateTabState(tabId);
    const previousUrl = state.url;
    const url = changeInfo?.url || tab?.url || '';

    await this._ready;

    // A newer event superseded this one.
    if (this._tabUpdateVersions.get(tabId) !== version) {
      return;
    }

    // Internal browser pages (about:, chrome://, extension pages, ...) should
    // never be scanned. Our own blocked page is special: keep the previous
    // result so the popup can still offer the whitelist flow.
    if (!isHttpUrl(url)) {
      if (url && this.isBlockedPageUrl(url)) {
        this.updatePopupForState(state);
        return;
      }

      if (!url) {
        this.updatePopupForState(state);
        return;
      }

      state.url = url;
      state.detectionResults = undefined;
      this.updateResult('report.html', '--');
      return;
    }

    const shouldDetect =
      !state.detectionResults ||
      url !== previousUrl ||
      !!changeInfo?.url ||
      changeInfo?.status === 'loading';

    if (!shouldDetect) {
      this.updatePopupForState(state);
      return;
    }

    const detectionResults = this.detectPhishing(url);
    state.url = url;
    state.detectionResults = detectionResults;

    const isPhishing = detectionResults.some(result => result.isPhishing);
    if (!isPhishing) {
      this.updateResult('report.html', this.calculateBadge(url));
      return;
    }

    // Read the whitelist from storage at decision time. This prevents a race
    // where the user has just whitelisted a domain, but the in-memory cache
    // has not been refreshed yet by the storage.onChanged event.
    const whitelistedUrls = await this.getWhitelistedUrlsFromStorage();
    this._whitelistedUrls = whitelistedUrls;

    if (isWhitelistedUrl(url, whitelistedUrls)) {
      this.updateResult('report.html', this.calculateBadge(url));
      return;
    }

    await this.storeLastKnownPhishingUrl(url);
    this.updateResult('unblock.html', this.calculateBadge(url));
    await this.blockTab(tabId, state);
  }

  private getOrCreateTabState(tabId: number, url = ''): TabState {
    let state = this._tabStates.get(tabId);
    if (!state) {
      state = { tabId, url };
      this._tabStates.set(tabId, state);
    } else if (url) {
      state.url = url;
    }
    return state;
  }

  private updatePopupForState(state: TabState): void {
    if (!state.detectionResults) {
      this.updateResult('report.html', '--');
      return;
    }

    const isPhishing = state.detectionResults.some(result => result.isPhishing);
    const isWhitelisted = isWhitelistedUrl(state.url, this._whitelistedUrls);

    this.updateResult(
      isPhishing && !isWhitelisted ? 'unblock.html' : 'report.html',
      this.calculateBadge(state.url)
    );
  }

  private calculateBadge(url: string): string {
    try {
      return BadgeScorer.calculate(this._communityUrls, this._rules, url)
        .phishingProbability;
    } catch (error) {
      console.error('Could not calculate the phishing score', error);
      return '--';
    }
  }

  private detectPhishing(url: string): DetectionResult[] {
    if (!url) {
      return [];
    }
    try {
      const engine = new Engine(this._communityUrls, ...this._rules);
      return engine.detect(url);
    } catch (error) {
      console.error('Could not run the phishing detection engine', error);
      return [];
    }
  }

  private async blockTab(tabId: number, state: TabState): Promise<void> {
    if (state.redirecting) {
      return;
    }

    state.redirecting = true;
    try {
      const blockedUrl = this._browserImpl.runtime.getURL('blocked.html');
      const tabs = this._browserImpl.tabs as typeof chrome.tabs;
      await tabs.update(tabId, { url: blockedUrl });
    } catch (error) {
      console.error('Could not redirect the tab to the blocked page', error);
    } finally {
      state.redirecting = false;
    }
  }

  private async closeTab(tabId: number): Promise<void> {
    try {
      await this._browserImpl.tabs.remove(tabId);
    } catch (error) {
      console.error('Could not close a phishing tab', error);
    }
  }

  private async storeLastKnownPhishingUrl(url: string): Promise<void> {
    try {
      await this._storage.updateLastKnownPhishingUrl(url);
    } catch (error) {
      console.error('Could not store the last known phishing URL', error);
    }
  }

  private isBlockedPageUrl(url: string): boolean {
    try {
      return url.startsWith(this._browserImpl.runtime.getURL('blocked.html'));
    } catch {
      return false;
    }
  }

  private loadCommunityUrls(): void {
    void this._communityLoader
      .getCommunityUrls()
      .then(urls => {
        if (Array.isArray(urls)) {
          this._communityUrls = urls;
        }
      })
      .catch(error => {
        console.error('Could not load community URLs', error);
      });
  }

  private initializeOpenTabs(): void {
    Promise.resolve(this._browserImpl.tabs.query({}))
      .then(tabs => {
        (tabs || []).forEach(tab => {
          // Do not overwrite a state that was created by an event while the
          // query was in flight.
          if (tab.id !== undefined && !this._tabStates.has(tab.id)) {
            this._tabStates.set(tab.id, {
              tabId: tab.id,
              url: tab.url || ''
            });
          }
        });
      })
      .catch(error => {
        console.error('Could not query the open tabs', error);
      });
  }

  private updateResult(popupPath: string, badge: string): void {
    try {
      this._browserImpl.action.setPopup({ popup: popupPath });
      this._browserImpl.action.setBadgeText({ text: badge });
    } catch (error) {
      console.error('Could not update the extension action', error);
    }
  }
}
