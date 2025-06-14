import { DEFAULT_RULES } from '../../rules/default';
import { Engine } from '../../engine/engine';
import { ChromeStorage } from './storage';
import { DetectionResult } from '../../model/detection-result';
import { PhishingRules } from '../../model/phishing-rules';
import { calculateBatchScore } from './badge';

const URL_PATTERN = '*://*/*';

export class ChromePlugin {
  private _rules: PhishingRules[] = [];
  private _whitelistedUrls: string[] = [];

  constructor(private _storage: ChromeStorage) {
    this.updateRules();
    this.updateWhitelistedUrls();

    chrome.webRequest.onBeforeRequest.addListener(
      details => {
        this.updateRules();
        this.updateWhitelistedUrls();
        this.updateBadgeScore();

        if (details.method === 'GET') {
          const currentUrl = details.url;
          const detectionResults = this.detectPhishing(currentUrl);
          const isPhishingDetected = detectionResults.some(r => r.isPhishing);
          const isWhitelisted = this.isWhitelisted(currentUrl);
          if (isPhishingDetected && !isWhitelisted) {
            this.setActiveHost(currentUrl);
            this.updateIcon('blocked.png');
            this.updatePopup('unblock.html');
            return { redirectUrl: chrome.runtime.getURL('blocked.html') };
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

  private setActiveHost(currentUrl: string) {
    if (this.isChromeExtension(currentUrl)) {
      return;
    }
    this._storage.setActiveHost(currentUrl);
  }

  private updateBadgeScore() {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      if (tabs.length > 0) {
        const currentTab = tabs[0];
        const currentUrl = currentTab.url;
        if (!currentUrl) {
          this.updateBadge('');
          return;
        }
        if (this.isWhitelisted(currentUrl)) {
          this.updateBadge('-');
          return;
        }
        if (this.isChromeExtension(currentUrl)) {
          this.updateBadge('');
          return;
        }
        const badgeScore = calculateBatchScore(this._rules, currentUrl);
        this.updateBadge(badgeScore.phishingProbability);
      }
    });
  }

  private isChromeExtension(url: string) {
    return url.startsWith('chrome-extension://');
  }

  private isWhitelisted(currentUrl: string) {
    return this._whitelistedUrls.some(whitelistedUrl =>
      currentUrl.includes(whitelistedUrl)
    );
  }

  private detectPhishing(url: string): DetectionResult[] {
    const engine = new Engine(...this._rules);
    return engine.detect(url);
  }

  private updateIcon(path: string): void {
    chrome.browserAction.setIcon({ path: path });
  }

  private updatePopup(path: string): void {
    chrome.browserAction.setPopup({ popup: path });
  }

  private updateBadge(text: string): void {
    chrome.browserAction.setBadgeText({ text: text });
  }

  private updateRules(): void {
    this._storage.getRules(rules => (this._rules = rules));
  }

  private updateWhitelistedUrls(): void {
    this._storage.getWhitelistedUrls(urls => (this._whitelistedUrls = urls));
  }
}

// Initialize plugin
const storage = new ChromeStorage(DEFAULT_RULES);
new ChromePlugin(storage);
