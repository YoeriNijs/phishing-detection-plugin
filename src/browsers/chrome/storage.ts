import { PhishingRules } from '../../model/phishing-rules';

export interface ChromeStorageObject {
  settings: {
    rules: PhishingRules[];
    whitelistedUrls: string[];
    tempUrl?: string;
  };
}

export class ChromeStorage {
  constructor(initialRules?: PhishingRules[]) {
    if (initialRules) {
      this.initializeStorage(initialRules);
    }
  }

  getRules(fn: (rules: PhishingRules[]) => void): void {
    chrome.storage.local.get(
      'settings',
      (chromeStorageObject: ChromeStorageObject) => {
        const rules = chromeStorageObject.settings.rules;
        fn(rules);
      }
    );
  }

  updateRules(rules_sets: PhishingRules[]) {
    if (rules_sets.length < 1) {
      rules_sets = [];
    } else if (rules_sets.every(rules => !rules.include && !rules.exclude)) {
      rules_sets = [];
    }

    chrome.storage.local.get('settings', storageObject => {
      const updatedStorageObject: ChromeStorageObject = {
        settings: {
          rules: rules_sets,
          whitelistedUrls: (storageObject as ChromeStorageObject).settings
            .whitelistedUrls
        }
      };
      chrome.storage.local.set(updatedStorageObject);
    });
  }

  getWhitelistedUrls(fn: (urls: string[]) => void): void {
    chrome.storage.local.get(
      'settings',
      (chromeStorageObject: ChromeStorageObject) => {
        const urls = chromeStorageObject.settings.whitelistedUrls;
        fn(urls);
      }
    );
  }

  addWhitelistedUrl(url: string) {
    const baseUrl = this.getBaseUrl(url);
    chrome.storage.local.get('settings', storageObject => {
      const whiteListedUrls = [
        ...(storageObject as ChromeStorageObject).settings.whitelistedUrls,
        baseUrl
      ];
      const uniqueWhitelistedUrls = new Set(whiteListedUrls);
      const updatedStorageObject: ChromeStorageObject = {
        settings: {
          rules: (storageObject as ChromeStorageObject).settings.rules,
          whitelistedUrls: [...uniqueWhitelistedUrls]
        }
      };
      chrome.storage.local.set(updatedStorageObject);
    });
  }

  updateTempUrl(tempUrl: string): void {
    const baseUrl = this.getBaseUrl(tempUrl);
    chrome.storage.local.get('settings', storageObject => {
      const updatedStorageObject: ChromeStorageObject = {
        settings: {
          rules: (storageObject as ChromeStorageObject).settings.rules,
          whitelistedUrls: (storageObject as ChromeStorageObject).settings
            .whitelistedUrls,
          tempUrl: baseUrl
        }
      };
      chrome.storage.local.set(updatedStorageObject);
    });
  }

  getTempUrl(fn: (url: string) => void): void {
    chrome.storage.local.get(
      'settings',
      (chromeStorageObject: ChromeStorageObject) => {
        const url = chromeStorageObject.settings.tempUrl || undefined;
        if (url) {
          fn(url);
        }
      }
    );
  }

  private getBaseUrl(url: string) {
    const parsedUrl = new URL(url);
    return `${parsedUrl.protocol}//${parsedUrl.host}`;
  }

  private initializeStorage(initialRules: PhishingRules[]) {
    chrome.storage.local.get('settings', (settings: any) => {
      // If the object is missing required fields, we still save the initial object
      if (!this.isStorageObject(settings)) {
        this.initializeStorageObject(initialRules);
      }
    });
  }

  private initializeStorageObject(initialRules: PhishingRules[]) {
    const storageObject: ChromeStorageObject = {
      settings: {
        rules: initialRules,
        whitelistedUrls: []
      }
    };
    chrome.storage.local.set(storageObject);
  }

  private isStorageObject(object: any): object is ChromeStorageObject {
    return object.rules && object.threshold && object.whitelistedUrls;
  }
}
