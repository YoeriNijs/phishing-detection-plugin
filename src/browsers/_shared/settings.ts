import { ChromeStorage } from '../chrome/chrome-storage';
import { DEFAULT_RULES } from '../../rules/default';
import { PhishingRules } from '../../model/phishing-rules';
import { getTranslationForKey } from './i18n/i18n';

const storage: ChromeStorage = new ChromeStorage(DEFAULT_RULES);

async function showRules() {
  const settingsTextArea: HTMLTextAreaElement =
    document.querySelector('textarea');
  if (settingsTextArea) {
    storage.getRules(rules => {
      settingsTextArea.value = JSON.stringify(rules, null, 4); // 4 spaces for indentation
    });
  }
}

function isPhishingRules(object: any): object is PhishingRules[] {
  if (Array.isArray(object)) {
    if (object.length < 1) {
      return false;
    }
    return object.every(v => !!v.exclude || !!v.include);
  }
  return false;
}

async function updateRules() {
  const settingsTextArea: HTMLTextAreaElement =
    document.querySelector('textarea');
  if (settingsTextArea) {
    try {
      const rules = JSON.parse(settingsTextArea.value);
      if (!isPhishingRules(rules)) {
        const msg = getTranslationForKey('invalid-rules-missing-fields');
        alert(msg);
        return;
      }
      storage.updateRules(rules);
      const msg = getTranslationForKey('rules-saved');
      alert(msg);
    } catch (e: any) {
      const msg = getTranslationForKey('invalid-rules');
      alert(msg);
    }
  }
}

function initialize(): void {
  // Show rules
  showRules();

  const updateBtn = document.querySelector('button');
  if (updateBtn) {
    updateBtn.addEventListener('click', () => updateRules());
  }
}

// Init settings page
initialize();
