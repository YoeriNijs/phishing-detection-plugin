import { ChromeStorage } from '../../chrome/chrome-storage';
import { DEFAULT_RULES } from '../../../rules/default';
import { FirefoxStorage } from '../../firefox/firefox-storage';
import { I18n } from '../i18n/i18n';

class UnsupportedBrowserError extends Error {
  constructor(msg: string) {
    super(msg);
  }
}

export function getBrowserImpl(): typeof chrome | typeof browser {
  if (typeof chrome !== 'undefined') {
    return chrome;
  }
  if (typeof browser !== 'undefined') {
    return browser;
  }
  throw new UnsupportedBrowserError('Unsupported browser!');
}

export function createStorageForBrowserImpl() {
  if (typeof chrome !== 'undefined') {
    return new ChromeStorage(DEFAULT_RULES);
  }
  if (typeof browser !== 'undefined') {
    return new FirefoxStorage(DEFAULT_RULES);
  }
  throw new UnsupportedBrowserError('Unsupported browser!');
}

export function translateI18nElements() {
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('i18n').forEach(element => {
      if (element.childNodes.length > 0) {
        element.childNodes.forEach(node => {
          const key = node.textContent;
          node.textContent = I18n.translate(key);
        });
      }
    });
  });
}
