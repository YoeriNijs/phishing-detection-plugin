import { PhishingRules } from '../../model/phishing-rules';

export interface FirefoxStorageObject {
  rules: PhishingRules[];
  whitelistedUrls: string[];
  communityUrls: string[];
}

export class FirefoxStorage {
  constructor(initialRules: PhishingRules[]) {
    this.initializeStorage(initialRules);
  }

  getRules(): Promise<PhishingRules[]> {
    return browser.storage.local
      .get()
      .then((storageObject: FirefoxStorageObject) => storageObject.rules);
  }

  updateRules(rules_sets: PhishingRules[]) {
    if (rules_sets.length < 1) {
      rules_sets = [];
    } else if (rules_sets.every(rules => !rules.include && !rules.exclude)) {
      rules_sets = [];
    }

    browser.storage.local.get().then(
      (storageObject: FirefoxStorageObject) => {
        const updatedStorageObject: FirefoxStorageObject = {
          rules: rules_sets,
          whitelistedUrls: storageObject.whitelistedUrls,
          communityUrls: storageObject.communityUrls
        };
        browser.storage.local.set(updatedStorageObject);
      },
      (e: any) => {
        throw Error(`Cannot update rules: ${e}`);
      }
    );
  }

  getCommunityUrls(): Promise<string[]> {
    return browser.storage.local
      .get()
      .then(
        (storageObject: FirefoxStorageObject) => storageObject.communityUrls
      );
  }

  addCommunityUrls(urls: string[]) {
    browser.storage.local.get().then(
      (storageObject: FirefoxStorageObject) => {
        const updatedStorageObject: FirefoxStorageObject = {
          rules: storageObject.rules,
          whitelistedUrls: storageObject.whitelistedUrls,
          communityUrls: [...storageObject.communityUrls, ...urls]
        };
        browser.storage.local.set(updatedStorageObject);
      },
      (e: any) => {
        throw Error(`Cannot update community urls: ${e}`);
      }
    );
  }

  private initializeStorage(initialRules: PhishingRules[]) {
    browser.storage.local.get().then(
      (storedObject: FirefoxStorageObject) => {
        // If the object is missing required fields, we still save the initial object
        if (!this.isStorageObject(storedObject)) {
          this.initializeStorageObject(initialRules);
        }
      },
      () => this.initializeStorageObject(initialRules)
    );
  }

  private initializeStorageObject(initialRules: PhishingRules[]) {
    const storageObject: FirefoxStorageObject = {
      rules: initialRules,
      whitelistedUrls: [],
      communityUrls: []
    };
    browser.storage.local.set(storageObject);
  }

  private isStorageObject(object: any): object is FirefoxStorageObject {
    return object.rules && object.threshold && object.whitelistedUrls;
  }
}
