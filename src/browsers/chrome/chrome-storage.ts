import {
  AbstractStorage,
  InitialRules,
  PluginSettings
} from '../_shared/abstract-storage';

export class ChromeStorage extends AbstractStorage {
  constructor(initialRules: InitialRules) {
    super(initialRules);
  }

  protected readSettings(): Promise<Partial<PluginSettings> | undefined> {
    return new Promise(resolve => {
      chrome.storage.local.get('settings', (storageObject: any) => {
        resolve(storageObject?.settings);
      });
    });
  }

  protected writeSettings(settings: PluginSettings): Promise<void> {
    return new Promise((resolve, reject) => {
      chrome.storage.local.set({ settings }, () => {
        const error = chrome.runtime?.lastError;
        if (error) {
          reject(new Error(error.message));
        } else {
          resolve();
        }
      });
    });
  }
}
