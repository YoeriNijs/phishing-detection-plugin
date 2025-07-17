import { PhishingRules } from '../../model/phishing-rules';
import { IStorage } from '../_shared/i-storage';
import { PluginStorageObject } from '../../model/plugin-storage-object';

export class FirefoxStorage implements IStorage {
  constructor(initialRules?: PhishingRules[]) {
    if (initialRules) {
      this.initializeStorage(initialRules);
    }
  }

  getRules(fn: (rules: PhishingRules[]) => void): void {
    browser.storage.local
      .get('settings')
      .then((pluginStorageObject: PluginStorageObject) => {
        const rules = pluginStorageObject.settings.rules;
        fn(rules);
      });
  }

  updateRules(rules_sets: PhishingRules[]): void {
    if (rules_sets.length < 1) {
      rules_sets = [];
    } else if (rules_sets.every(rules => !rules.include && !rules.exclude)) {
      rules_sets = [];
    }

    browser.storage.local.get('settings').then(storageObject => {
      const updatedStorageObject: PluginStorageObject = {
        settings: {
          rules: rules_sets,
          whitelistedUrls: (storageObject as PluginStorageObject).settings
            .whitelistedUrls
        }
      };
      return browser.storage.local.set(updatedStorageObject);
    });
  }

  getWhitelistedUrls(fn: (urls: string[]) => void): void {
    browser.storage.local
      .get('settings')
      .then((storageObject: PluginStorageObject) => {
        const urls = storageObject.settings.whitelistedUrls;
        fn(urls);
      });
  }

  addWhitelistedUrl(url: string): void {
    const baseUrl = this.getBaseUrl(url);
    browser.storage.local.get('settings').then(storageObject => {
      const whiteListedUrls = [
        ...(storageObject as PluginStorageObject).settings.whitelistedUrls,
        baseUrl
      ];
      const uniqueWhitelistedUrls = new Set(whiteListedUrls);
      const updatedStorageObject: PluginStorageObject = {
        settings: {
          rules: (storageObject as PluginStorageObject).settings.rules,
          whitelistedUrls: [...uniqueWhitelistedUrls]
        }
      };
      return browser.storage.local.set(updatedStorageObject);
    });
  }

  updateTempUrl(tempUrl: string): void {
    const baseUrl = this.getBaseUrl(tempUrl);
    browser.storage.local.get('settings').then(storageObject => {
      const updatedStorageObject: PluginStorageObject = {
        settings: {
          rules: (storageObject as PluginStorageObject).settings.rules,
          whitelistedUrls: (storageObject as PluginStorageObject).settings
            .whitelistedUrls,
          tempUrl: baseUrl
        }
      };
      return browser.storage.local.set(updatedStorageObject);
    });
  }

  getTempUrl(fn: (url: string) => void): void {
    browser.storage.local
      .get('settings')
      .then((storageObject: PluginStorageObject) => {
        const url = storageObject.settings.tempUrl || undefined;
        if (url) {
          fn(url);
        }
      });
  }

  private getBaseUrl(url: string) {
    const parsedUrl = new URL(url);
    return `${parsedUrl.protocol}//${parsedUrl.host}`;
  }

  private initializeStorage(initialRules: PhishingRules[]) {
    browser.storage.local.get('settings').then((settings: any) => {
      if (this.hasInvalidSettings(settings)) {
        this.initializeStorageObject(initialRules);
      }
    });
  }

  private hasInvalidSettings(settings: any): boolean {
    return (
      settings === null ||
      !settings ||
      !settings.rules ||
      !settings.whitelistedUrls
    );
  }

  private initializeStorageObject(initialRules: PhishingRules[]) {
    const storageObject: PluginStorageObject = {
      settings: {
        rules: initialRules,
        whitelistedUrls: []
      }
    };
    browser.storage.local.set(storageObject);
  }
}
