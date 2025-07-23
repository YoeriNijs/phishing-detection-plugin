import { PhishingRules } from '../../model/phishing-rules';
import { IStorage } from '../_shared/i-storage';
import { PluginStorageObject } from '../../model/plugin-storage-object';

export class ChromeStorage implements IStorage {
  constructor(initialRules?: PhishingRules[]) {
    if (initialRules) {
      this.initializeStorage(initialRules);
    }
  }

  getRules(fn: (rules: PhishingRules[]) => void): void {
    chrome.storage.local.get(
      'settings',
      (storageObject: PluginStorageObject) => {
        const rules = storageObject.settings.rules;
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
      const updatedStorageObject: PluginStorageObject = {
        settings: {
          rules: rules_sets,
          whitelistedUrls: (storageObject as PluginStorageObject).settings
            .whitelistedUrls
        }
      };
      chrome.storage.local.set(updatedStorageObject);
    });
  }

  getWhitelistedUrls(fn: (urls: string[]) => void): void {
    chrome.storage.local.get(
      'settings',
      (chromeStorageObject: PluginStorageObject) => {
        const urls = chromeStorageObject.settings.whitelistedUrls;
        fn(urls);
      }
    );
  }

  addWhitelistedUrl(url: string) {
    const baseUrl = this.getBaseUrl(url);
    chrome.storage.local.get('settings', storageObject => {
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
      chrome.storage.local.set(updatedStorageObject);
    });
  }

  updateLastKnownPhishingUrl(tempUrl: string): void {
    const baseUrl = this.getBaseUrl(tempUrl);
    chrome.storage.local.get('settings', storageObject => {
      const updatedStorageObject: PluginStorageObject = {
        settings: {
          rules: (storageObject as PluginStorageObject).settings.rules,
          whitelistedUrls: (storageObject as PluginStorageObject).settings
            .whitelistedUrls,
          lastKnownPhishingUrl: baseUrl
        }
      };
      chrome.storage.local.set(updatedStorageObject);
    });
  }

  getTempUrl(fn: (url: string) => void): void {
    chrome.storage.local.get(
      'settings',
      (chromeStorageObject: PluginStorageObject) => {
        const url =
          chromeStorageObject.settings.lastKnownPhishingUrl || undefined;
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
    chrome.storage.local.set(storageObject);
  }
}
