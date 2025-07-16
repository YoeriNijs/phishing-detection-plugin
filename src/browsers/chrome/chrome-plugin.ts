import { ChromeStorage } from './chrome-storage';
import { DEFAULT_RULES } from '../../rules/default';
import { PhishingDetectionPlugin } from '../_shared/plugin';
import { PhishingRules } from '../../model/phishing-rules';

const LATEST_RULES =
  'https://raw.githubusercontent.com/YoeriNijs/phishing-detection-plugin/refs/heads/main/release/latest_rules.json';

async function updateRules(all_rules: PhishingRules[]) {
  const response = await fetch(LATEST_RULES);
  if (response.ok) {
    const text = await response.text();
    all_rules = JSON.parse(text);
  }
  return all_rules;
}

// Initialize plugin
chrome.runtime.onInstalled.addListener(async () => {
  const all_rules: PhishingRules[] = await updateRules(DEFAULT_RULES);
  const storage = new ChromeStorage(all_rules);
  new PhishingDetectionPlugin(storage, chrome);
});
