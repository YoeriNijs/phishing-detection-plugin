import { ChromeStorage } from '../chrome-storage';
import { DEFAULT_RULES } from '../../../rules/default';
import { PhishingRules } from '../../../model/phishing-rules';
import { createHostRule } from '../../../testing';

describe('ChromeStorage', () => {
  let storageObject: Record<string, any>;
  let getMock: jest.Mock;
  let setMock: jest.Mock;

  const getRules = (storage: ChromeStorage): Promise<PhishingRules[]> =>
    new Promise(resolve => storage.getRules(resolve));

  const getWhitelistedUrls = (storage: ChromeStorage): Promise<string[]> =>
    new Promise(resolve => storage.getWhitelistedUrls(resolve));

  const getTempUrl = (storage: ChromeStorage): Promise<string | undefined> =>
    new Promise(resolve => storage.getTempUrl(resolve));

  beforeEach(() => {
    storageObject = {};
    getMock = jest.fn((_key: string, callback: (value: any) => void) => {
      callback(storageObject);
    });
    setMock = jest.fn((value: any, callback?: () => void) => {
      storageObject = { ...storageObject, ...value };
      callback?.();
    });

    (globalThis as any).chrome = {
      runtime: {},
      storage: {
        local: {
          get: getMock,
          set: setMock
        }
      }
    };
  });

  afterEach(() => {
    delete (globalThis as any).chrome;
  });

  it('should initialize the default rules when storage is empty', async () => {
    const storage = new ChromeStorage(DEFAULT_RULES);
    const rules = await getRules(storage);

    expect(rules).toEqual(DEFAULT_RULES);
    expect(storageObject.settings.whitelistedUrls).toEqual([]);
  });

  it('should not reset existing rules and whitelisted URLs on startup', async () => {
    const customRules: PhishingRules[] = [
      {
        threshold: 1,
        include: [createHostRule({ value: 'example.com' })]
      }
    ];
    storageObject = {
      settings: {
        rules: customRules,
        whitelistedUrls: ['https://example.com'],
        lastKnownPhishingUrl: 'https://phishing.test'
      }
    };

    const storage = new ChromeStorage(DEFAULT_RULES);

    expect(await getRules(storage)).toEqual(customRules);
    expect(await getWhitelistedUrls(storage)).toEqual(['https://example.com']);
    expect(await getTempUrl(storage)).toBe('https://phishing.test');
    expect(setMock).not.toHaveBeenCalled();
  });

  it('should preserve the whitelist when updating the rules', async () => {
    storageObject = {
      settings: {
        rules: DEFAULT_RULES,
        whitelistedUrls: ['https://example.com']
      }
    };
    const storage = new ChromeStorage(DEFAULT_RULES);
    await getRules(storage);

    await storage.updateRules([
      { threshold: 1, include: [createHostRule({ value: 'new.test' })] }
    ]);

    expect(await getWhitelistedUrls(storage)).toEqual(['https://example.com']);
  });

  it('should preserve rules and the last known phishing URL when whitelisting a domain', async () => {
    storageObject = {
      settings: {
        rules: DEFAULT_RULES,
        whitelistedUrls: ['https://example.com'],
        lastKnownPhishingUrl: 'https://phishing.test'
      }
    };
    const storage = new ChromeStorage(DEFAULT_RULES);
    await getWhitelistedUrls(storage);

    await storage.addWhitelistedUrl('https://phishing.test/some/path');
    await storage.addWhitelistedUrl('https://phishing.test/another/path');

    expect(await getWhitelistedUrls(storage)).toEqual([
      'https://example.com',
      'https://phishing.test'
    ]);
    expect(await getRules(storage)).toEqual(DEFAULT_RULES);
    expect(await getTempUrl(storage)).toBe('https://phishing.test');
  });

  it('should keep a whitelisted domain after the plugin restarts', async () => {
    const firstStorage = new ChromeStorage(DEFAULT_RULES);
    await getWhitelistedUrls(firstStorage);
    await firstStorage.addWhitelistedUrl('https://phishing.test/login');

    // Simulate a background service worker restart: a new storage instance is
    // created with the same underlying browser storage.
    const secondStorage = new ChromeStorage(DEFAULT_RULES);

    expect(await getWhitelistedUrls(secondStorage)).toEqual([
      'https://phishing.test'
    ]);
  });

  it('should repair partially invalid storage without losing valid fields', async () => {
    storageObject = {
      settings: {
        rules: DEFAULT_RULES
      }
    };
    const storage = new ChromeStorage(DEFAULT_RULES);

    expect(await getRules(storage)).toEqual(DEFAULT_RULES);
    expect(await getWhitelistedUrls(storage)).toEqual([]);
  });

  it('should not load the initial rules when valid rules are stored', async () => {
    const customRules: PhishingRules[] = [
      {
        threshold: 1,
        include: [createHostRule({ value: 'example.com' })]
      }
    ];
    storageObject = {
      settings: {
        rules: customRules,
        whitelistedUrls: []
      }
    };
    const rulesProvider = jest.fn(() => Promise.resolve(DEFAULT_RULES));

    const storage = new ChromeStorage(rulesProvider);
    expect(await getRules(storage)).toEqual(customRules);
    expect(rulesProvider).not.toHaveBeenCalled();
  });

  it('should load the initial rules only once when storage is empty', async () => {
    const rulesProvider = jest.fn(() => Promise.resolve(DEFAULT_RULES));

    const storage = new ChromeStorage(rulesProvider);
    expect(await getRules(storage)).toEqual(DEFAULT_RULES);
    expect(await getRules(storage)).toEqual(DEFAULT_RULES);
    expect(rulesProvider).toHaveBeenCalledTimes(1);
  });

  it('should return undefined when there is no last known phishing URL', async () => {
    const storage = new ChromeStorage(DEFAULT_RULES);
    expect(await getTempUrl(storage)).toBeUndefined();
  });

  it('should ignore invalid update rules', async () => {
    const storage = new ChromeStorage(DEFAULT_RULES);
    await getRules(storage);

    await storage.updateRules([]);
    expect(await getRules(storage)).toEqual([]);
  });
});
