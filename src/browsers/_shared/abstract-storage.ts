import { PhishingRules } from '../../model/phishing-rules';
import { PluginStorageObject } from '../../model/plugin-storage-object';
import { IStorage } from './i-storage';
import { getOrigin } from './util/url-util';

export type PluginSettings = PluginStorageObject['settings'];

export type InitialRules =
  | PhishingRules[]
  | Promise<PhishingRules[]>
  | (() => PhishingRules[] | Promise<PhishingRules[]>);

/**
 * Shared storage logic for Chrome and Firefox.
 *
 * The only browser-specific parts are reading and writing the `settings`
 * object. Keeping the validation/migration logic in one place prevents the two
 * implementations from drifting apart.
 */
export abstract class AbstractStorage implements IStorage {
  private readonly _initialRules: () => Promise<PhishingRules[]>;
  private _initialRulesPromise?: Promise<PhishingRules[]>;
  private readonly _settingsReady: Promise<void>;

  protected constructor(initialRules: InitialRules) {
    this._initialRules = async () => {
      try {
        const rules =
          typeof initialRules === 'function'
            ? await initialRules()
            : await initialRules;
        return Array.isArray(rules) ? rules : [];
      } catch (error) {
        console.warn('Could not load the initial rules', error);
        return [];
      }
    };

    // Make sure the storage object exists and is in a usable state. This is
    // intentionally lazy: on a fresh install the latest rules may still be
    // fetched while the background script is already listening for events.
    this._settingsReady = this.initializeSettings();
  }

  getRules(fn: (rules: PhishingRules[]) => void): void {
    void this.getValidSettings()
      .then(settings => fn(settings.rules))
      .catch(error => {
        console.error('Could not read phishing rules', error);
        fn([]);
      });
  }

  updateRules(rules_sets: PhishingRules[]): Promise<void> {
    return this.updateSettings(settings => ({
      ...settings,
      rules: this.normalizeRules(rules_sets)
    }));
  }

  getWhitelistedUrls(fn: (urls: string[]) => void): void {
    void this.getValidSettings()
      .then(settings => fn(settings.whitelistedUrls))
      .catch(error => {
        console.error('Could not read whitelisted URLs', error);
        fn([]);
      });
  }

  addWhitelistedUrl(url: string): Promise<void> {
    const origin = getOrigin(url);
    if (!origin) {
      return Promise.resolve();
    }

    return this.updateSettings(settings => {
      const whitelistedUrls = new Set(settings.whitelistedUrls);
      whitelistedUrls.add(origin);
      return { ...settings, whitelistedUrls: [...whitelistedUrls] };
    });
  }

  updateLastKnownPhishingUrl(tempUrl: string): Promise<void> {
    const origin = getOrigin(tempUrl);
    if (!origin) {
      return Promise.resolve();
    }

    return this.updateSettings(settings => ({
      ...settings,
      lastKnownPhishingUrl: origin
    }));
  }

  getTempUrl(fn: (url?: string) => void): void {
    void this.getValidSettings()
      .then(settings => fn(settings.lastKnownPhishingUrl))
      .catch(error => {
        console.error('Could not read the last known phishing URL', error);
        fn(undefined);
      });
  }

  /**
   * Reads the `settings` object from the browser storage. Implementations must
   * resolve with `undefined` when nothing has been stored yet.
   */
  protected abstract readSettings(): Promise<
    Partial<PluginSettings> | undefined
  >;

  /**
   * Persists the `settings` object to the browser storage.
   */
  protected abstract writeSettings(settings: PluginSettings): Promise<void>;

  private async initializeSettings(): Promise<void> {
    await this.resolveSettings();
  }

  private async getValidSettings(): Promise<PluginSettings> {
    await this._settingsReady;
    return this.resolveSettings();
  }

  private async updateSettings(
    update: (settings: PluginSettings) => PluginSettings
  ): Promise<void> {
    const settings = await this.getValidSettings();
    await this.writeSettings(update(settings));
  }

  private async resolveSettings(): Promise<PluginSettings> {
    let stored: Partial<PluginSettings> | undefined;
    let readFailed = false;

    try {
      stored = await this.readSettings();
    } catch (error) {
      // Do not overwrite unknown storage contents when reading failed.
      readFailed = true;
      console.error('Could not read extension settings', error);
    }

    const settings: PluginSettings = {
      rules: Array.isArray(stored?.rules)
        ? stored.rules
        : await this.getInitialRules(),
      whitelistedUrls: Array.isArray(stored?.whitelistedUrls)
        ? stored.whitelistedUrls
        : [],
      ...(typeof stored?.lastKnownPhishingUrl === 'string'
        ? { lastKnownPhishingUrl: stored.lastKnownPhishingUrl }
        : {})
    };

    if (!readFailed && !this.hasValidSettings(stored)) {
      try {
        await this.writeSettings(settings);
      } catch (error) {
        console.error('Could not initialize extension settings', error);
      }
    }

    return settings;
  }

  private getInitialRules(): Promise<PhishingRules[]> {
    if (!this._initialRulesPromise) {
      this._initialRulesPromise = this._initialRules();
    }
    return this._initialRulesPromise;
  }

  private hasValidSettings(
    settings: Partial<PluginSettings> | undefined
  ): settings is PluginSettings {
    return (
      !!settings &&
      Array.isArray(settings.rules) &&
      Array.isArray(settings.whitelistedUrls)
    );
  }

  private normalizeRules(rules: PhishingRules[]): PhishingRules[] {
    if (!Array.isArray(rules) || rules.length < 1) {
      return [];
    }
    if (rules.every(rulesSet => !rulesSet.include && !rulesSet.exclude)) {
      return [];
    }
    return rules;
  }
}
