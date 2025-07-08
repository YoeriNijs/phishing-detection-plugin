import { ChromeStorage } from './chrome-storage';
import { DEFAULT_RULES } from '../../rules/default';
import { PhishingDetectionPlugin } from '../_shared/plugin';

// Initialize plugin
chrome.runtime.onInstalled.addListener(() => {
  const storage = new ChromeStorage(DEFAULT_RULES);
  new PhishingDetectionPlugin(storage, chrome);
});
