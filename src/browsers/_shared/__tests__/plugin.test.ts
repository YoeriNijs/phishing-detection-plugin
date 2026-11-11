import { PhishingDetectionPlugin } from '../plugin';
import { IStorage } from '../i-storage';
import { PhishingRules } from '../../../model/phishing-rules';
import { createContainsRule, createHostRule } from '../../../testing';

class InMemoryStorage implements IStorage {
  rules: PhishingRules[] = [];
  whitelistedUrls: string[] = [];
  lastKnownPhishingUrl?: string;

  constructor(settings: Partial<InMemoryStorage> = {}) {
    Object.assign(this, settings);
  }

  getRules(fn: (rules: PhishingRules[]) => void): void {
    fn(this.rules);
  }

  updateRules(rules: PhishingRules[]): Promise<void> {
    this.rules = rules;
    return Promise.resolve();
  }

  getWhitelistedUrls(fn: (urls: string[]) => void): void {
    fn(this.whitelistedUrls);
  }

  addWhitelistedUrl(url: string): Promise<void> {
    this.whitelistedUrls = [...this.whitelistedUrls, url];
    return Promise.resolve();
  }

  updateLastKnownPhishingUrl(url: string): Promise<void> {
    this.lastKnownPhishingUrl = url;
    return Promise.resolve();
  }

  getTempUrl(fn: (url?: string) => void): void {
    fn(this.lastKnownPhishingUrl);
  }
}

type Handler = (...args: any[]) => any;

function createBrowserMock() {
  const listeners: Record<string, Handler> = {};
  const addListener = (name: string) => (handler: Handler) => {
    listeners[name] = handler;
  };

  const tabs = {
    onCreated: { addListener: addListener('created') },
    onUpdated: { addListener: addListener('updated') },
    onRemoved: { addListener: addListener('removed') },
    onActivated: { addListener: addListener('activated') },
    query: jest.fn().mockResolvedValue([]),
    update: jest.fn().mockResolvedValue(undefined),
    remove: jest.fn().mockResolvedValue(undefined)
  };
  const action = {
    setPopup: jest.fn(),
    setBadgeText: jest.fn()
  };
  const runtime = {
    getURL: (path: string) => `chrome-extension://test/${path}`
  };
  const storage = {
    onChanged: { addListener: addListener('storageChanged') }
  };

  return {
    browser: { tabs, action, runtime, storage } as any,
    listeners,
    tabs,
    action
  };
}

const PHISHING_RULES: PhishingRules[] = [
  {
    threshold: 1,
    include: [createHostRule({ value: 'evil.test', weight: 1 })]
  }
];

const BLOCKED_URL = 'chrome-extension://test/blocked.html';

async function createPlugin(
  storage = new InMemoryStorage({ rules: PHISHING_RULES })
) {
  const mock = createBrowserMock();
  const plugin = new PhishingDetectionPlugin(storage, mock.browser, {
    getCommunityUrls: () => Promise.resolve([])
  } as any);
  await plugin.whenReady();
  return { plugin, storage, ...mock };
}

async function updateTab(
  listeners: Record<string, Handler>,
  tabId: number,
  url: string,
  changeInfo: Record<string, any> = { url, status: 'loading' }
) {
  return listeners.updated(tabId, changeInfo, { id: tabId, url });
}

describe('PhishingDetectionPlugin', () => {
  it('should redirect a phishing tab to the blocked page', async () => {
    const { listeners, tabs, action, storage } = await createPlugin();
    listeners.created({ id: 1, url: '' });

    await updateTab(listeners, 1, 'https://evil.test/login');

    expect(tabs.update).toHaveBeenCalledWith(1, { url: BLOCKED_URL });
    expect(action.setPopup).toHaveBeenLastCalledWith({
      popup: 'unblock.html'
    });
    expect(storage.lastKnownPhishingUrl).toBe('https://evil.test/login');
  });

  it('should not redirect a whitelisted phishing tab', async () => {
    const { listeners, tabs, action } = await createPlugin(
      new InMemoryStorage({
        rules: PHISHING_RULES,
        whitelistedUrls: ['https://evil.test']
      })
    );
    listeners.created({ id: 1, url: '' });

    await updateTab(listeners, 1, 'https://evil.test/login');

    expect(tabs.update).not.toHaveBeenCalled();
    expect(action.setPopup).toHaveBeenLastCalledWith({ popup: 'report.html' });
  });

  it('should read the whitelist from storage at decision time', async () => {
    const storage = new InMemoryStorage({ rules: PHISHING_RULES });
    const { listeners, tabs } = await createPlugin(storage);

    // Simulate the unblock page persisting a whitelist entry after this
    // plugin instance was initialized, without a storage.onChanged event yet.
    storage.whitelistedUrls = ['https://evil.test'];
    listeners.created({ id: 1, url: '' });

    await updateTab(listeners, 1, 'https://evil.test/login');

    expect(tabs.update).not.toHaveBeenCalled();
  });

  it('should not whitelist a domain that only starts with a whitelisted domain', async () => {
    const { listeners, tabs } = await createPlugin(
      new InMemoryStorage({
        rules: [
          {
            threshold: 1,
            include: [createContainsRule({ value: 'evil.test', weight: 1 })]
          }
        ],
        whitelistedUrls: ['https://evil.test']
      })
    );
    listeners.created({ id: 1, url: '' });

    await updateTab(listeners, 1, 'https://evil.test.attacker.example');

    expect(tabs.update).toHaveBeenCalledWith(1, { url: BLOCKED_URL });
  });

  it('should handle updates for tabs that were opened before the plugin started', async () => {
    const { listeners, tabs } = await createPlugin();

    await updateTab(listeners, 42, 'https://evil.test/login');

    expect(tabs.update).toHaveBeenCalledWith(42, { url: BLOCKED_URL });
  });

  it('should not throw when an update has no URL', async () => {
    const { listeners, tabs } = await createPlugin();
    listeners.created({ id: 1, url: '' });

    await expect(
      listeners.updated(1, { status: 'loading' }, { id: 1, url: undefined })
    ).resolves.toBeUndefined();
    expect(tabs.update).not.toHaveBeenCalled();
  });

  it('should keep the unblock popup on the blocked page without redirecting again', async () => {
    const { listeners, tabs, action } = await createPlugin();
    listeners.created({ id: 1, url: '' });
    await updateTab(listeners, 1, 'https://evil.test/login');

    tabs.update.mockClear();
    await updateTab(listeners, 1, BLOCKED_URL, {
      url: BLOCKED_URL,
      status: 'complete'
    });

    expect(tabs.update).not.toHaveBeenCalled();
    expect(action.setPopup).toHaveBeenLastCalledWith({
      popup: 'unblock.html'
    });
  });

  it('should show the report popup for a safe page', async () => {
    const { listeners, action } = await createPlugin();
    listeners.created({ id: 1, url: '' });

    await updateTab(listeners, 1, 'https://safe.test');

    expect(action.setPopup).toHaveBeenLastCalledWith({ popup: 'report.html' });
    expect(action.setBadgeText).toHaveBeenLastCalledWith({ text: '0.0' });
  });

  it('should close previous phishing tabs but not the activated tab', async () => {
    const { listeners, tabs } = await createPlugin();

    listeners.created({ id: 1, url: '' });
    await updateTab(listeners, 1, 'https://evil.test/login');

    listeners.created({ id: 2, url: '' });
    await updateTab(listeners, 2, 'https://safe.test');

    tabs.remove.mockClear();
    await listeners.activated({ tabId: 2 });

    expect(tabs.remove).toHaveBeenCalledWith(1);
    expect(tabs.remove).not.toHaveBeenCalledWith(2);
  });

  it('should not close the activated blocked tab', async () => {
    const { listeners, tabs } = await createPlugin();

    listeners.created({ id: 1, url: '' });
    await updateTab(listeners, 1, 'https://evil.test/login');

    tabs.remove.mockClear();
    await listeners.activated({ tabId: 1 });

    expect(tabs.remove).not.toHaveBeenCalled();
  });

  it('should reload the rules when the settings change in storage', async () => {
    const storage = new InMemoryStorage({ rules: [] });
    const { listeners, tabs } = await createPlugin(storage);
    listeners.created({ id: 1, url: '' });

    await updateTab(listeners, 1, 'https://evil.test/login');
    expect(tabs.update).not.toHaveBeenCalled();

    // Simulate the settings page saving new rules.
    storage.rules = PHISHING_RULES;
    listeners.storageChanged({ settings: { newValue: 'changed' } }, 'local');

    await updateTab(listeners, 1, 'https://evil.test/login', {
      url: 'https://evil.test/login',
      status: 'loading'
    });

    expect(tabs.update).toHaveBeenCalledWith(1, { url: BLOCKED_URL });
  });

  it('should forget removed tabs', async () => {
    const { listeners, tabs } = await createPlugin();
    listeners.created({ id: 1, url: '' });
    await updateTab(listeners, 1, 'https://evil.test/login');

    listeners.removed(1);

    tabs.update.mockClear();
    await updateTab(listeners, 1, 'https://evil.test/login');

    // The tab is treated as a new tab and detected again.
    expect(tabs.update).toHaveBeenCalledWith(1, { url: BLOCKED_URL });
  });
});
