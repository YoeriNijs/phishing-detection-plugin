import { ChromeStorage } from './chrome-storage';
import { DEFAULT_RULES } from '../../rules/default';
import { PhishingDetectionPlugin } from '../_shared/plugin';

importScripts('settings.js');
importScripts('report.js');
importScripts('unblock.js');
importScripts('i18n.js');

// Initialize plugin
chrome.runtime.onInstalled.addListener(() => {
  const storage = new ChromeStorage(DEFAULT_RULES);
  new PhishingDetectionPlugin(storage, chrome);
});
