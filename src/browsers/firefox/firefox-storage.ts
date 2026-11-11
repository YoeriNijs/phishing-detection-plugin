import {
  AbstractStorage,
  InitialRules,
  PluginSettings
} from '../_shared/abstract-storage';

export class FirefoxStorage extends AbstractStorage {
  constructor(initialRules: InitialRules) {
    super(initialRules);
  }

  protected async readSettings(): Promise<Partial<PluginSettings> | undefined> {
    const storageObject: any = await browser.storage.local.get('settings');
    return storageObject?.settings;
  }

  protected async writeSettings(settings: PluginSettings): Promise<void> {
    await browser.storage.local.set({ settings });
  }
}
