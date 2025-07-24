import { Engine } from '../../engine/engine';
import { DetectionResult } from '../../model/detection-result';
import { PhishingRules } from '../../model/phishing-rules';
import { CommunityLoader } from '../../community/community-loader';
import { IStorage } from './i-storage';
import { BadgeScorer } from './badge-scorer';

interface TabIdAndDetectionResults {
  tabId: number;
  url: string;
  detectionResults?: DetectionResult[];
}

class NotCreatedTabIdAndDetectionResults extends Error {}

export class PhishingDetectionPlugin {
  private _rules: PhishingRules[] = [];
  private _communityUrls: string[] = [];
  private _whitelistedUrls: string[] = [];
  private _tabIdsAndDetectionResults: Set<TabIdAndDetectionResults> =
    new Set<TabIdAndDetectionResults>();

  constructor(
    private _storage: IStorage,
    private _browserImpl: typeof chrome | typeof browser,
    private _communityLoader = new CommunityLoader()
  ) {
    this.updateRules();
    this.loadCommunityUrls();
    this.setWhitelistedUrls();

    /**
     * When tab is removed by user
     */
    this._browserImpl.tabs.onRemoved.addListener((tabId: number) => {
      const itemToRemove = Array.from(this._tabIdsAndDetectionResults).find(
        item => item.tabId === tabId
      );
      if (itemToRemove) {
        this._tabIdsAndDetectionResults.delete(itemToRemove);
      }

      // Update the latest rules since something may have been changed
      this.updateRules();
      this.setWhitelistedUrls();
    });

    /**
     * When tab is activated by user (opened for the first time, or opened again after selecting it).
     * In this stage, we do NOT update the state. We are only interested in the last score. If it is phishing, the
     * user is already navigated to the unblock page by the onUpdated event, so we do not need to redirect the user
     * again.
     */
    this._browserImpl.tabs.onActivated.addListener(activeInfo => {
      this._browserImpl.tabs.get(activeInfo.tabId, tab => {
        // Update the latest rules since something may have been changed
        this.loadCommunityUrls();
        this.setWhitelistedUrls();

        // Close all previous phishing tabs first. If the user has activated
        // another tab, we assume he is not interested anymore in the phishing
        // tab, so we close it for him in order to protect further unwanted
        // interactions. Also, this helps us to prevent messy behaviour with
        // other new phishing detections, since we may have multiple phishing
        // urls to deal with.
        Array.from(this._tabIdsAndDetectionResults)
          .filter(item => item.detectionResults)
          .filter(item => item.detectionResults.some(r => r.isPhishing))
          .map(item => item.tabId)
          .forEach(tabId => this._browserImpl.tabs.remove(tabId));

        const activeTabResults = Array.from(
          this._tabIdsAndDetectionResults
        ).find(item => item.tabId === tab.id);

        // Unknown detection or no detection. In that case, report nothing here
        if (!activeTabResults || !activeTabResults.detectionResults) {
          this.updateResult('report.html', '--');
          return;
        }

        // Start reporting on what is known for this tab (do NOT update it here, and do NOT redirect)
        const isWhitelisted = this._whitelistedUrls.some(wlu =>
          activeTabResults.url.startsWith(wlu)
        );
        const isPhishing =
          activeTabResults.detectionResults &&
          activeTabResults.detectionResults.some(res => res.isPhishing);
        const badgeScore = BadgeScorer.calculate(
          this._communityUrls,
          this._rules,
          activeTabResults.url
        ).phishingProbability;
        if (isPhishing && !isWhitelisted) {
          this.updateResult('unblock.html', badgeScore);
        } else {
          this.updateResult('report.html', badgeScore);
        }
      });
    });

    /**
     * When content of tab is updated. This is the ONLY stage where we check on phishing attempts.
     */
    this._browserImpl.tabs.onUpdated.addListener((_a, _b, tab) => {
      const url = tab.url;
      const itemToUpdate = Array.from(this._tabIdsAndDetectionResults).find(
        item => item.tabId === tab.id
      );

      // We expect a tab state here (which was created in the onCreated events). If it does not exist here, this means
      // that we made an error.
      if (!itemToUpdate) {
        throw new NotCreatedTabIdAndDetectionResults(
          `Not created tabId ${tab.id}, while it should be!`
        );
      }

      // If our URL is undefined or the url is a internal browser url, such as the extension settings page, we are only
      // interested in the previous url. If we have one, act accordingly.
      if (!url || this.isBrowserUrl(url)) {
        const isWhitelisted = this._whitelistedUrls.some(wlu =>
          url.startsWith(wlu)
        );
        const isPhishing =
          itemToUpdate.detectionResults &&
          itemToUpdate.detectionResults.some(res => res.isPhishing);
        const badgeScore = BadgeScorer.calculate(
          this._communityUrls,
          this._rules,
          itemToUpdate.url
        );
        if (isPhishing && !isWhitelisted) {
          this.updateResult('unblock.html', badgeScore.phishingProbability);
        } else {
          this.updateResult('report.html', badgeScore.phishingProbability);
        }

        return;
      }

      // If we have an URL, this means that we have something to check on. So check it, and then update the state in
      // our tabs set. Also, report the phishing detection, and redirect the user to the unblock page if it is phishing.
      const detectionResults: DetectionResult[] = this.detectPhishing(url);
      const updatedItem = Object.assign({}, itemToUpdate);
      this._tabIdsAndDetectionResults.delete(itemToUpdate);
      updatedItem.url = tab.url;
      updatedItem.detectionResults = detectionResults;
      this._tabIdsAndDetectionResults.add(updatedItem);

      const isWhitelisted = this._whitelistedUrls.some(wlu =>
        url.startsWith(wlu)
      );
      const isPhishing = detectionResults.some(res => res.isPhishing);
      const badgeScore = BadgeScorer.calculate(
        this._communityUrls,
        this._rules,
        url
      ).phishingProbability;
      if (isPhishing && !isWhitelisted) {
        this.updateLastKnownPhishingUrl(url);
        this.updateResult('unblock.html', badgeScore);

        // @ts-ignore
        this._browserImpl.tabs.update(tab.id, {
          url: this._browserImpl.runtime.getURL('blocked.html')
        });
      } else {
        this.updateResult('report.html', badgeScore);
      }
    });

    /**
     * When tab is created. We create an initial tab value to query on in later events.
     * Do NOT check for phishing in this stage yet.
     */
    this._browserImpl.tabs.onCreated.addListener(tab => {
      const item: TabIdAndDetectionResults = {
        tabId: tab.id,
        url: tab.url,
        detectionResults: undefined
      };
      this._tabIdsAndDetectionResults.add(item);
    });
  }

  private setWhitelistedUrls() {
    this._storage.getWhitelistedUrls((whitelistedUrls: string[]) => {
      if (whitelistedUrls && Array.isArray(whitelistedUrls)) {
        this._whitelistedUrls = whitelistedUrls;
      }
    });
  }

  private detectPhishing(url: string): DetectionResult[] {
    if (!url) {
      return [];
    }
    const engine = new Engine(this._communityUrls, ...this._rules);
    return engine.detect(url);
  }

  private updateResult(popupPath: string, badge: string): void {
    this._browserImpl.action.setPopup({ popup: popupPath });
    this._browserImpl.action.setBadgeText({ text: badge });
  }

  private updateRules(): void {
    this._storage.getRules(rules => (this._rules = rules));
  }

  private loadCommunityUrls() {
    this._communityLoader
      .getCommunityUrls()
      .then(urls => (this._communityUrls = urls));
  }

  private updateLastKnownPhishingUrl(url: string): void {
    if (this.isBrowserUrl(url)) {
      return;
    }
    this._storage.updateLastKnownPhishingUrl(url);
  }

  private isBrowserUrl(url: string): boolean {
    switch (true) {
      case url.toLowerCase().includes('chrome-extension'):
      case url.toLowerCase().includes('moz-extension'):
        return true;
      default:
        return false;
    }
  }
}
