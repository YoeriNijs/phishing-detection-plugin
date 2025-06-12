import { PhishingRules } from '../../model/phishing-rules';

export interface ChromeStorageObject {
  settings: {
    rules: PhishingRules[];
    whitelistedUrls: string[];
  };
}

export class ChromeStorage {
  constructor(initialRules: PhishingRules[]) {
    this.initializeStorage(initialRules);
  }

  setInitiator(initiator: string) {
    chrome.storage.local.set({ initiator: initiator });
  }

  getInitiator(fn: (initiator: string | undefined) => void): void {
    chrome.storage.local.get('initiator', value => fn(value.initiator));
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
