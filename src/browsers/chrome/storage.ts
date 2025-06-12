import { PhishingRules } from '../../model/phishing-rules';

export interface ChromeStorageObject {
  rules: PhishingRules[];
  whitelistedUrls: string[];
}

export class ChromeStorage {
  constructor(initialRules: PhishingRules[]) {
    this.initializeStorage(initialRules);
  }

  executeWithRules<T>(
    fn: (chromeStorageObject: ChromeStorageObject) => T
  ): T | undefined {
    let value: T = undefined;
    chrome.storage.local.get('settings', chromeStorageObject => {
      if (chromeStorageObject.settings) {
        value = fn(
          chromeStorageObject.settings as unknown as ChromeStorageObject
        );
      }
      return undefined;
    });
    return value;
  }

  getWhitelistedUrls(): Promise<string[]> {
    return chrome.storage.local
      .get()
      .then((res: ChromeStorageObject) => res.whitelistedUrls);
  }

  whitelistUrls(...urls: string[]): void {
    chrome.storage.local.get('settings', chromeStorageObject => {
      const updatedWhitelistedUrls = urls
        .concat((chromeStorageObject as ChromeStorageObject).whitelistedUrls)
        .reduce((prev, curr) => {
          if (prev.includes(curr)) {
            return prev;
          } else {
            prev.push(curr);
            return prev;
          }
        }, []);
      const updatedStorageObject: ChromeStorageObject = {
        rules: (chromeStorageObject as ChromeStorageObject).rules,
        whitelistedUrls: updatedWhitelistedUrls
      };
      chrome.storage.local.set({ settings: updatedStorageObject });
    });
  }

  updateThreshold(threshold: number) {
    if (threshold < 0 || threshold > 1) {
      throw Error(
        `Threshold must be a value between 0 and 1, but is ${threshold}`
      );
    }
    chrome.storage.local.get('settings', storageObject => {
      const updatedStorageObject: ChromeStorageObject = {
        rules: storageObject.rules,
        whitelistedUrls: (storageObject as ChromeStorageObject).whitelistedUrls
      };
      chrome.storage.local.set({ settings: updatedStorageObject });
    });
  }

  updateRules(rules_sets: PhishingRules[]) {
    if (rules_sets.length < 1) {
      rules_sets = [];
    } else if (rules_sets.every(rules => !rules.include && !rules.exclude)) {
      rules_sets = [];
    }

    chrome.storage.local.get('settings', storageObject => {
      const updatedStorageObject: ChromeStorageObject = {
        rules: rules_sets,
        whitelistedUrls: (storageObject as ChromeStorageObject).whitelistedUrls
      };
      chrome.storage.local.set({ settings: updatedStorageObject });
    });
  }

  private initializeStorage(initialRules: PhishingRules[]) {
    chrome.storage.local.get((object: any) => {
      // If the object is missing required fields, we still save the initial object
      if (!object.settings || !this.isStorageObject(object.settings)) {
        this.initializeStorageObject(initialRules);
      }
    });
  }

  private initializeStorageObject(initialRules: PhishingRules[]) {
    const storageObject: ChromeStorageObject = {
      rules: initialRules,
      whitelistedUrls: []
    };
    chrome.storage.local.set({ settings: storageObject });
  }

  private isStorageObject(object: any): object is ChromeStorageObject {
    return object.rules && object.threshold && object.whitelistedUrls;
  }
}
