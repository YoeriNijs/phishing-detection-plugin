import { ChromeStorage } from '../../chrome/chrome-storage';
import { DEFAULT_RULES } from '../../../rules/default';
import { FirefoxStorage } from '../../firefox/firefox-storage';
import { IStorage } from '../i-storage';

class UnsupportedBrowserError extends Error {
  constructor(msg: string) {
    super(msg);
  }
}

/**
 * Firefox exposes both the `browser` and the `chrome` namespace. The `browser`
 * namespace is promise based and is the preferred API there. Chrome only
 * exposes `chrome`.
 */
function hasBrowserApi(): boolean {
  return typeof browser !== 'undefined' && !!browser?.runtime?.id;
}

function hasChromeApi(): boolean {
  return typeof chrome !== 'undefined' && !!chrome?.runtime?.id;
}

export function getBrowserImpl(): typeof chrome | typeof browser {
  if (hasBrowserApi()) {
    return browser;
  }
  if (hasChromeApi()) {
    return chrome;
  }
  throw new UnsupportedBrowserError('Unsupported browser!');
}

export function createStorageForBrowserImpl(): IStorage {
  if (hasBrowserApi()) {
    return new FirefoxStorage(DEFAULT_RULES);
  }
  if (hasChromeApi()) {
    return new ChromeStorage(DEFAULT_RULES);
  }
  throw new UnsupportedBrowserError('Unsupported browser!');
}
