import { Engine } from '../../engine/engine';
import { DetectionResult } from '../../model/detection-result';
import { PhishingRules } from '../../model/phishing-rules';
import { CommunityLoader } from '../../community/community-loader';
import { IStorage } from './i-storage';
import { BadgeScorer } from './badge-scorer';

export class PhishingDetectionPlugin {
  private _rules: PhishingRules[] = [];
  private _communityUrls: string[] = [];
  private _whitelistedUrls: string[] = [];

  constructor(
    private _storage: IStorage,
    private _browserImpl: typeof chrome | typeof browser
  ) {
    this.updateRules();
    this.loadCommunityUrls();
    this.setWhitelistedUrls();

    chrome.tabs.onRemoved.addListener(tabId => {
      this.updateRules();
      this.setWhitelistedUrls();
    });

    this._browserImpl.tabs.onUpdated.addListener((tabId, _, tab) => {
      this.updateRules();
      this.setWhitelistedUrls();

      const currentUrl = tab.url;
      const isWhitelisted = this._whitelistedUrls.some(wlu =>
        currentUrl.startsWith(wlu)
      );
      if (isWhitelisted) {
        this.updateResult('report.html', 'X');
        return;
      }

      const badgeScore = BadgeScorer.calculate(this._rules, currentUrl);
      this.updateResult('report.html', badgeScore.phishingProbability);

      const detectionResults = this.detectPhishing(currentUrl);
      const isPhishingDetected = detectionResults.some(r => r.isPhishing);
      if (isPhishingDetected) {
        this.updateTempUrl(currentUrl);
        this.updateResult('unblock.html', badgeScore.phishingProbability);

        // Log for debugging purposes
        console.log(detectionResults);

        const blockedUrl = this._browserImpl.runtime.getURL('blocked.html');
        // @ts-ignore
        this._browserImpl.tabs.update(tabId, { url: blockedUrl, active: true });
      }
    });
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
    const loader = new CommunityLoader();
    loader.getCommunityUrls().then(urls => (this._communityUrls = urls));
  }

  private updateTempUrl(url: string): void {
    this._storage.updateTempUrl(url);
  }
}
