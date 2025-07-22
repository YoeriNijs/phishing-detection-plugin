import { Engine } from '../../engine/engine';
import { DetectionResult } from '../../model/detection-result';
import { PhishingRules } from '../../model/phishing-rules';
import { CommunityLoader } from '../../community/community-loader';
import { IStorage } from './i-storage';
import { BadgeScorer } from './badge-scorer';

interface TabIdAndScore {
  tabId: number;
  popup: string;
  badge: string;
}

interface ScanResult {
  type: 'whitelisted' | 'empty' | 'found';
  url: string;
  score: string;
  isPhishing: () => boolean;
}

const EMPTY_SCAN_RESULT: ScanResult = {
  url: undefined,
  type: 'empty',
  isPhishing: () => false,
  score: undefined
};

export class PhishingDetectionPlugin {
  private _rules: PhishingRules[] = [];
  private _communityUrls: string[] = [];
  private _whitelistedUrls: string[] = [];
  private _tabIdsAndScores: TabIdAndScore[] = [];

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
      console.log('onRemoved tabId', tabId);
      this._tabIdsAndScores = this._tabIdsAndScores.filter(
        v => v.tabId !== tabId
      );

      this.updateRules();
      this.setWhitelistedUrls();
    });

    /**
     * When tab is activated by user
     */
    this._browserImpl.tabs.onActivated.addListener(activeInfo => {
      console.log('activated tabId', activeInfo);
      this._browserImpl.tabs.get(activeInfo.tabId, tab => {
        if (this._browserImpl.runtime.lastError) {
          return; // Tab is invalid
        }

        // If we already have a scan result for the tab id, then use that one
        const tabIdAndScore = this._tabIdsAndScores.find(
          v => v.tabId === tab.id
        );
        if (tabIdAndScore) {
          console.log('saved score', tabIdAndScore);
          this.updateResult(tabIdAndScore.popup, tabIdAndScore.badge);
        } else {
          console.log('unsaved score', tabIdAndScore);
          const scanResult = this.scanUrl(tab);
          this._tabIdsAndScores.push({
            tabId: tab.id,
            popup: 'report.html',
            badge: scanResult.score
          });
          this.updateResult('report.html', scanResult.score);
          if (scanResult.isPhishing()) {
            this.handlePhishing(scanResult, tab);
          }
        }
      });
    });

    /**
     * When content of tab is updated
     */
    this._browserImpl.tabs.onUpdated.addListener((_a, _b, tab) => {
      console.log('updated tabId', tab.id, tab);
      this.updateRules();
      this.setWhitelistedUrls();

      const scanResult = this.scanUrl(tab);
      console.log('scanresult', scanResult);
      if (scanResult.type === 'empty') {
        this.updateResult(undefined, undefined);
      } else {
        this._tabIdsAndScores.push({
          tabId: tab.id,
          popup: 'report.html',
          badge: scanResult.score
        });
        this.updateResult('report.html', scanResult.score);
      }
      if (scanResult.isPhishing()) {
        this.handlePhishing(scanResult, tab);
      }
    });

    /**
     * When tab is created
     */
    this._browserImpl.tabs.onCreated.addListener(() => {
      this.updateResult('report.html', undefined);
    });
  }

  private handlePhishing(scanResult: ScanResult, tab: Partial<{ id: number }>) {
    this.updateTempUrl(scanResult.url);
    this.updateResult('unblock.html', undefined); // Never show the score when we show the unblock screen
    this._tabIdsAndScores.find(v => v.tabId === tab.id).popup = 'unblock.html';

    // Redirect user to blocked page
    const blockedUrl = this._browserImpl.runtime.getURL('blocked.html');
    // @ts-ignore
    this._browserImpl.tabs.update(tab.id, {
      url: blockedUrl,
      active: true
    });
  }

  private scanUrl(tab: Partial<{ url: string }>): ScanResult {
    const currentUrl = tab.url;
    console.log(currentUrl, tab);
    if (!currentUrl) {
      return EMPTY_SCAN_RESULT;
    }
    const isWhitelisted = this._whitelistedUrls.some(wlu =>
      currentUrl.startsWith(wlu)
    );
    const detectionResults = this.detectPhishing(currentUrl);
    return {
      url: currentUrl,
      type: isWhitelisted ? 'whitelisted' : 'found',
      score: BadgeScorer.calculate(detectionResults, currentUrl)
        .phishingProbability,
      isPhishing: () =>
        !isWhitelisted && detectionResults.some(res => res.isPhishing)
    };
  }

  private setWhitelistedUrls() {
    this._storage.getWhitelistedUrls((whitelistedUrls: string[]) => {
      this._whitelistedUrls = whitelistedUrls;
    });
  }

  private detectPhishing(url: string): DetectionResult[] {
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

  private updateTempUrl(url: string): void {
    switch (true) {
      case url.toLowerCase().includes('chrome-extension'):
      case url.toLowerCase().includes('moz-extension'):
        return;
      default:
        this._storage.updateTempUrl(url);
    }
  }
}
