import { DEFAULT_RULES } from '../../rules/default';
import { Engine } from '../../engine/engine';
import { ChromeStorage } from './storage';
import { DetectionResult } from '../../model/detection-result';
import BlockingResponse = chrome.webRequest.BlockingResponse;
import OnBeforeRequestDetails = chrome.webRequest.OnBeforeRequestDetails;
import { PhishingRules } from '../../model/phishing-rules';

export class ChromePlugin {
  constructor(private _storage: ChromeStorage) {
    chrome.webRequest.onBeforeRequest.addListener(
      details =>
        this._storage.executeWithRules<BlockingResponse>(v =>
          this.intercept(details, v.rules)
        ),
      { urls: ['<all_urls>'] },
      ['blocking']
    );
  }

  intercept(
    details: OnBeforeRequestDetails,
    rules: PhishingRules[]
  ): BlockingResponse {
    const currentUrl = details.initiator || details.url;
    const detectionResults = this.detectPhishing(currentUrl, rules);
    const isPhishingDetected = detectionResults.some(r => r.isPhishing);
    if (isPhishingDetected) {
      this.updateIcon('blocked.png');
      this.updatePopup('blocked.html');
      this.updateBadge('X');
      return { redirectUrl: chrome.runtime.getURL('blocked.html') };
    } else {
      this.updateIcon('shield.png');
      this.updatePopup('settings.html');
      const highestScore = detectionResults
        .sort((a, b) => {
          if (a.phishingProbability > b.phishingProbability) {
            return -1;
          } else {
            return 1;
          }
        })
        .map(v => v.phishingProbability)
        .pop()
        .toFixed(1);
      this.updateBadge(`${highestScore}`);
    }
  }

  private detectPhishing(
    url: string,
    rules: PhishingRules[]
  ): DetectionResult[] {
    const engine = new Engine(...rules);
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
}

// Initialize plugin
const storage = new ChromeStorage(DEFAULT_RULES);
new ChromePlugin(storage);
