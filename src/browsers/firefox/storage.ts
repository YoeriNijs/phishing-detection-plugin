import { PhishingRules } from "../../model/phishing-rules";

export interface FirefoxStorageObject {
  rules: PhishingRules;
  whitelistedUrls: string[];
  threshold: number;
}

export class FirefoxStorage {

  private readonly _initialThreshold: number = 0.9;

  constructor(initialRules: PhishingRules) {
    this.initializeStorage(initialRules);
  }

  getThreshold(): Promise<number> {
    // @ts-ignore
    return browser.storage.local
      .get()
      .then((storageObject: FirefoxStorageObject) => storageObject.threshold);
  }

  getRules(): Promise<PhishingRules> {
    // @ts-ignore
    return browser.storage.local
      .get()
      .then((storageObject: FirefoxStorageObject) => storageObject.rules);
  }

  getWhitelistedUrls(): Promise<string[]> {
    // @ts-ignore
    return browser.storage.local
      .get()
      .then((storageObject: FirefoxStorageObject) => storageObject.whitelistedUrls);
  }

  whitelistUrls(...urls: string[]): void {
    // @ts-ignore
    let gettingItem = browser.storage.local.get();
    gettingItem.then(
      (storageObject: FirefoxStorageObject) => {
        const updatedWhitelistedUrls = urls
          .concat(storageObject.whitelistedUrls)
          .reduce((prev, curr) => {
            if (prev.includes(curr)) {
              return prev;
            } else {
              prev.push(curr);
              return prev;
            }
          }, []);
        const updatedStorageObject: FirefoxStorageObject = {
          rules: storageObject.rules,
          whitelistedUrls: updatedWhitelistedUrls,
          threshold: storageObject.threshold
        };
        // @ts-ignore
        browser.storage.local.set(updatedStorageObject);
      }
    );
  }

  updateThreshold(threshold: number) {
    if (threshold < 0 || threshold > 1) {
      throw Error(`Threshold must be a value between 0 and 1, but is ${threshold}`);
    }
    // @ts-ignore
    let gettingItem = browser.storage.local.get();
    gettingItem.then(
      (storageObject: FirefoxStorageObject) => {
        const updatedStorageObject: FirefoxStorageObject = {
          rules: storageObject.rules,
          whitelistedUrls: storageObject.whitelistedUrls,
          threshold: threshold
        };
        // @ts-ignore
        browser.storage.local.set(updatedStorageObject);
      },
      (e: any) => {
        throw Error(`Cannot update threshold: ${e}`)
      }
    );
  }

  updateRules(rules: PhishingRules) {
    if (!rules || !rules.include && rules.exclude) {
      rules = {};
    }

    // @ts-ignore
    let gettingItem = browser.storage.local.get();
    gettingItem.then(
      (storageObject: FirefoxStorageObject) => {
        const updatedStorageObject: FirefoxStorageObject = {
          rules: rules,
          whitelistedUrls: storageObject.whitelistedUrls,
          threshold: storageObject.threshold
        };
        // @ts-ignore
        browser.storage.local.set(updatedStorageObject);
      },
      (e: any) => {
        throw Error(`Cannot update rules: ${e}`)
      }
    );
  }

  private initializeStorage(initialRules: PhishingRules) {
    // @ts-ignore
    let gettingItem = browser.storage.local.get();
    gettingItem.then(
      (storedObject: FirefoxStorageObject) => {
        // If the object is missing required fields, we still save the initial object
        if (!this.isStorageObject(storedObject)) {
          this.initializeStorageObject(initialRules);
        }
      },
      () => this.initializeStorageObject(initialRules)
    );
  }

  private initializeStorageObject(initialRules: PhishingRules) {
    const storageObject: FirefoxStorageObject = {
      rules: initialRules,
      whitelistedUrls: [],
      threshold: this._initialThreshold
    };
    // @ts-ignore
    browser.storage.local.set(storageObject);
  }

  private isStorageObject(object: any): object is FirefoxStorageObject {
    return object.rules && object.threshold && object.whitelistedUrls;
  }
}