import { DEFAULT_RULES } from '../../rules/default';
import { Engine } from '../../engine/engine';
import { FirefoxStorage } from './storage';
import { DetectionResult } from '../../model/detection-result';

// See https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webRequest/onBeforeRequest#details
interface BrowserDetails {
  // Target of the request.
  url: string;

  // URL of the resource which triggered the request. For example, if
  // "https://example.com" contains a link, and the user clicks the link, then
  // the originUrl for the resulting request is "https://example.com".
  originUrl: string;
}

// See https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webRequest/BlockingResponse
interface BlockingResponse {
  //  If true, the request is cancelled.
  cancel: boolean;

  // This is a URL, and if set, the original request is redirected to that URL.
  redirectTo: string;
}

export class FirefoxPlugin {
  constructor(private _storage: FirefoxStorage) {
    // This event is triggered when a request is about to be made, and before
    // headers are available. See https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webRequest/onBeforeRequest
    // @ts-ignore
    browser.webRequest.onBeforeRequest.addListener(
      (details: BrowserDetails) => this.intercept(details),
      { urls: ['<all_urls>'] },
      ['blocking']
    );
  }

  async intercept(details: BrowserDetails): Promise<BlockingResponse> {
    const currentUrl = details.url;
    const detectionResults = await this.detectPhishing(currentUrl);
    const isPhishingDetected = detectionResults.some(r => r.isPhishing);
    if (isPhishingDetected) {
      this.updateIcon('blocked.png');
      this.updatePopup('blocked.html');
      this.updateBadge('X');
      // @ts-ignore
      return { redirectUrl: browser.runtime.getURL('blocked.html') };
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

  private async detectPhishing(url: string): Promise<DetectionResult[]> {
    const rules = await this._storage.getRules();
    const engine = new Engine(...rules);
    return engine.detect(url);
  }

  private updateIcon(path: string): void {
    // @ts-ignore
    browser.browserAction.setIcon({ path: path });
  }

  private updatePopup(path: string): void {
    // @ts-ignore
    browser.browserAction.setPopup({ popup: path });
  }

  private updateBadge(text: string): void {
    // @ts-ignore
    browser.browserAction.setBadgeText({ text: text });
  }
}

// Initialize plugin
const storage = new FirefoxStorage(DEFAULT_RULES);
new FirefoxPlugin(storage);
