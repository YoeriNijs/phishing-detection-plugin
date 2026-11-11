import { FirefoxStorage } from '../firefox-storage';
import { DEFAULT_RULES } from '../../../rules/default';
import { PhishingRules } from '../../../model/phishing-rules';
import { createHostRule } from '../../../testing';

describe('FirefoxStorage', () => {
  let storageObject: Record<string, any>;
  let getMock: jest.Mock;
  let setMock: jest.Mock;

  const getRules = (storage: FirefoxStorage): Promise<PhishingRules[]> =>
    new Promise(resolve => storage.getRules(resolve));

  const getWhitelistedUrls = (storage: FirefoxStorage): Promise<string[]> =>
    new Promise(resolve => storage.getWhitelistedUrls(resolve));

  const getTempUrl = (storage: FirefoxStorage): Promise<string | undefined> =>
    new Promise(resolve => storage.getTempUrl(resolve));

  beforeEach(() => {
    storageObject = {};
    getMock = jest.fn(async (_key: string) => storageObject);
    setMock = jest.fn(async (value: any) => {
      storageObject = { ...storageObject, ...value };
    });

    (globalThis as any).browser = {
      storage: {
        local: {
          get: getMock,
          set: setMock
        }
      }
    };
  });

  afterEach(() => {
    delete (globalThis as any).browser;
  });

  it('should initialize the default rules when storage is empty', async () => {
    const storage = new FirefoxStorage(DEFAULT_RULES);
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

    const storage = new FirefoxStorage(DEFAULT_RULES);

    expect(await getRules(storage)).toEqual(customRules);
    expect(await getWhitelistedUrls(storage)).toEqual(['https://example.com']);
    expect(await getTempUrl(storage)).toBe('https://phishing.test');
    expect(setMock).not.toHaveBeenCalled();
  });

  it('should keep a whitelisted domain after the plugin restarts', async () => {
    const firstStorage = new FirefoxStorage(DEFAULT_RULES);
    await getWhitelistedUrls(firstStorage);
    await firstStorage.addWhitelistedUrl('https://phishing.test/login');

    const secondStorage = new FirefoxStorage(DEFAULT_RULES);

    expect(await getWhitelistedUrls(secondStorage)).toEqual([
      'https://phishing.test'
    ]);
  });
});
