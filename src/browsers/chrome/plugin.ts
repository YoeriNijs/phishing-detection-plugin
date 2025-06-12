import { DEFAULT_RULES } from '../../rules/default';
import { Engine } from '../../engine/engine';
import { ChromeStorage } from './storage';
import { DetectionResult } from '../../model/detection-result';
import BlockingResponse = chrome.webRequest.BlockingResponse;
import OnBeforeRequestDetails = chrome.webRequest.OnBeforeRequestDetails;
import { PhishingRules } from '../../model/phishing-rules';

export class ChromePlugin {
  private _rules: PhishingRules[] = [];

  constructor(private _storage: ChromeStorage) {
    this.updateRules();

    chrome.webRequest.onBeforeRequest.addListener(
      details => this.intercept(details),
      { urls: ['<all_urls>'] },
      ['blocking']
    );
  }

  intercept(details: OnBeforeRequestDetails): BlockingResponse {
    const currentUrl = details.initiator || details.url;
    if (currentUrl.includes('chrome-extension://')) {
      this.updateRules();
      return { cancel: false };
    }
    this._storage.setInitiator(currentUrl);
    if (this._rules && Array.isArray(this._rules)) {
      const detectionResults = this.detectPhishing(currentUrl);
      const isPhishingDetected = detectionResults.some(r => r.isPhishing);
      if (isPhishingDetected) {
        this.updateIcon('blocked.png');
        this.updatePopup('report.html');
        this.updateBadge('X');
        this.updateRules();
        return { redirectUrl: chrome.runtime.getURL('blocked.html') };
      } else {
        this.updateIcon('shield.png');
        this.updatePopup('report.html');
        const highestScore = detectionResults
          .sort((a, b) => {
            if (a.phishingProbability > b.phishingProbability) {
              return 1;
            } else {
              return -1;
            }
          })
          .map(v => v.phishingProbability)
          .pop()
          .toFixed(1);
        this.updateBadge(`${highestScore}`);
        this.updateRules();
        return { cancel: false };
      }
    }

    return { cancel: true };
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
}

// Initialize plugin
const storage = new ChromeStorage(DEFAULT_RULES);
new ChromePlugin(storage);
