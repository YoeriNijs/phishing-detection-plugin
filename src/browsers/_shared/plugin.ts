import { Engine } from '../../engine/engine';
import { DetectionResult } from '../../model/detection-result';
import { PhishingRules } from '../../model/phishing-rules';
import { calculateBatchScore } from './badge';
import { CommunityLoader } from '../../community/community-loader';
import { IStorage } from './i-storage';

const URL_PATTERN = '*://*/*';

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

    this._browserImpl.webRequest.onBeforeRequest.addListener(
      details => {
        this.updateRules();
        this.updateBadgeScore();
        this.setWhitelistedUrls();

        if (details.method === 'GET') {
          const url = details.url;

          const isWhitelisted = this._whitelistedUrls.some(wlu =>
            url.startsWith(wlu)
          );
          const detectionResults = this.detectPhishing(url);
          const isPhishingDetected = detectionResults.some(r => r.isPhishing);
          if (isPhishingDetected && !isWhitelisted) {
            this.updateTempUrl(url);
            this.updateIcon('blocked.png');
            this.updatePopup('unblock.html');
            return {
              redirectUrl: this._browserImpl.runtime.getURL('blocked.html')
            };
          } else {
            this.updateIcon('shield.png');
            this.updatePopup('report.html');
          }
        }
      },
      { urls: [URL_PATTERN] },
      ['blocking']
    );
  }

  private setWhitelistedUrls() {
    this._storage.getWhitelistedUrls((whitelistedUrls: string[]) => {
      this._whitelistedUrls = whitelistedUrls;
    });
  }

  private updateBadgeScore() {
    this._browserImpl.tabs.query(
      { active: true, currentWindow: true },
      tabs => {
        if (tabs.length > 0) {
          const currentTab = tabs[0];
          const currentUrl = currentTab.url;
          if (!currentUrl || currentUrl.startsWith('chrome-extension://')) {
            this.updateBadge('');
            return;
          }
          const isWhitelisted = this._whitelistedUrls.some(wlu =>
            currentUrl.startsWith(wlu)
          );
          if (isWhitelisted) {
            this.updateBadge('X');
            return;
          }
          const badgeScore = calculateBatchScore(this._rules, currentUrl);
          this.updateBadge(badgeScore.phishingProbability);
        }
      }
    );
  }

  private detectPhishing(url: string): DetectionResult[] {
    const engine = new Engine(this._communityUrls, ...this._rules);
    return engine.detect(url);
  }

  private updateIcon(path: string): void {
    this._browserImpl.browserAction.setIcon({ path: path });
  }

  private updatePopup(path: string): void {
    this._browserImpl.browserAction.setPopup({ popup: path });
  }

  private updateBadge(text: string): void {
    this._browserImpl.browserAction.setBadgeText({ text: text });
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
