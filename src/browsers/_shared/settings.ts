import { ChromeStorage } from '../chrome/chrome-storage';
import { DEFAULT_RULES } from '../../rules/default';
import { PhishingRules } from '../../model/phishing-rules';
import { I18n } from './i18n/i18n';

const storage: ChromeStorage = new ChromeStorage(DEFAULT_RULES);

async function showRules() {
  const settingsTextArea: HTMLTextAreaElement =
    document.querySelector('textarea');
  if (settingsTextArea) {
    storage.getRules(rules => {
      console.log('rules', rules);
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
        const msg = I18n.translate('invalid-rules-missing-fields');
        alert(msg);
        return;
      }
      storage.updateRules(rules);
      const msg = I18n.translate('rules-saved');
      alert(msg);
    } catch (e: any) {
      const msg = I18n.translate('invalid-rules');
      alert(msg);
    }
  }
}

function initialize(): void {
  // Translate first
  I18n.translateI18NElements();

  // Show rules
  showRules();

  const updateBtn = document.querySelector('button');
  if (updateBtn) {
    updateBtn.addEventListener('click', () => updateRules());
  }
}

initialize();
