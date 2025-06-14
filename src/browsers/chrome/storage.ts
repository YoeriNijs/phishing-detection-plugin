import { PhishingRules } from '../../model/phishing-rules';

export interface ChromeStorageObject {
  settings: {
    rules: PhishingRules[];
    whitelistedUrls: string[];
    activeHost?: string | undefined;
  };
}

export class ChromeStorage {
  constructor(initialRules: PhishingRules[]) {
    this.initializeStorage(initialRules);
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

  addWhitelistedUrl(...urls: string[]) {
    if (urls.length < 1) {
      return;
    }

    const hostnames = urls.map(u => this.toHostname(u));
    const uniqueHostnames = new Set<string>(hostnames);

    chrome.storage.local.get(
      'settings',
      (chromeStorageObject: ChromeStorageObject) => {
        const whitelistedUrls = [
          ...chromeStorageObject.settings.whitelistedUrls
        ];
        whitelistedUrls.push(...uniqueHostnames);
        const uniqueWhitelistedUrls = new Set(whitelistedUrls);
        const updatedStorageObject: ChromeStorageObject = {
          settings: {
            rules: chromeStorageObject.settings.rules,
            whitelistedUrls: [...uniqueWhitelistedUrls]
          }
        };
        chrome.storage.local.set(updatedStorageObject);
      }
    );
  }

  getWhitelistedUrls(fn: (whitelistedUrls: string[]) => void): void {
    chrome.storage.local.get(
      'settings',
      (chromeStorageObject: ChromeStorageObject) => {
        const urls = chromeStorageObject.settings.whitelistedUrls;
        fn(urls);
      }
    );
  }

  setActiveHost(url: string | undefined): void {
    chrome.storage.local.get(
      'settings',
      (chromeStorageObject: ChromeStorageObject) => {
        const storageObject: ChromeStorageObject = {
          settings: {
            rules: chromeStorageObject.settings.rules,
            whitelistedUrls: chromeStorageObject.settings.whitelistedUrls,
            activeHost: url ? this.toHostname(url) : undefined
          }
        };
        chrome.storage.local.set(storageObject);
      }
    );
  }

  getActiveHost(fn: (activeHost: string | undefined) => void): void {
    chrome.storage.local.get(
      'settings',
      (chromeStorageObject: ChromeStorageObject) => {
        const activeUrl = chromeStorageObject.settings.activeHost;
        const activeHost = activeUrl ? this.toHostname(activeUrl) : activeUrl;
        fn(activeHost);
      }
    );
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

  private toHostname(url: string): string {
    const u = new URL(url);
    return u.hostname;
  }
}
