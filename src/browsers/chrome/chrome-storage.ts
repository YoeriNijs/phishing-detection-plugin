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

  /**
   * This writes the extension settings to the Chrome local storage. Currently, 10MB is the default storage size,
   * which should be sufficient for our purposes. See https://developer.chrome.com/docs/extensions/reference/api/storage
   */
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
