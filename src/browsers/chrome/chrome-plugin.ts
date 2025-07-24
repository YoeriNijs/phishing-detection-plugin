import { ChromeStorage } from './chrome-storage';
import { DEFAULT_RULES } from '../../rules/default';
import { PhishingDetectionPlugin } from '../_shared/plugin';
import { PhishingRules } from '../../model/phishing-rules';

const LATEST_RULES =
  'https://raw.githubusercontent.com/YoeriNijs/phishing-detection-plugin/refs/heads/main/release/latest_rules.json';

let pluginInstance: PhishingDetectionPlugin | null = null;

async function updateRules(all_rules: PhishingRules[]) {
  const response = await fetch(LATEST_RULES);
  if (response.ok) {
    const text = await response.text();
    all_rules = JSON.parse(text);
  }
  return all_rules;
}

async function initializePlugin() {
  const all_rules: PhishingRules[] = await updateRules(DEFAULT_RULES);
  const storage = new ChromeStorage(all_rules);

  // Check if the plugin instance already exists
  if (!pluginInstance) {
    pluginInstance = new PhishingDetectionPlugin(storage, chrome);
  }

  return all_rules;
}

/**
 * Fired when a profile that has this extension installed first starts up. This event is not fired when an incognito
 * profile is started, even if this extension is operating in 'split' incognito mode.
 */
chrome.runtime.onStartup.addListener(async () => {
  const all_rules = await initializePlugin();
  console.log(`Started Phishing Detection Plugin with rules:`, all_rules);
});

/**
 * Fired when the extension is first installed, when the extension is updated to a new version, and when Chrome is
 * updated to a new version.
 */
chrome.runtime.onInstalled.addListener(async () => {
  const all_rules = await initializePlugin();
  console.log(`Initialized Phishing Detection Plugin with rules:`, all_rules);
});
