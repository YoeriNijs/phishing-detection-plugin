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
    // Firefox can store 10MB of extension localstorage data, which should be more than sufficient for our purposes.
    // See: https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria#how_much_data_can_be_stored
    await browser.storage.local.set({ settings });
  }
}
