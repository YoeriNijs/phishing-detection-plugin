import { ChromeStorage } from './storage';
import { DEFAULT_RULES } from '../../rules/default';
import { PhishingRules } from '../../model/phishing-rules';
import { Engine } from '../../engine/engine';

const storage: ChromeStorage = new ChromeStorage(DEFAULT_RULES);

async function showRules() {
  const settingsTextArea: HTMLTextAreaElement =
    document.querySelector('textarea');
  if (settingsTextArea) {
    const phishingRules = storage.executeWithRules<PhishingRules[]>(
      chromeStorageObject => chromeStorageObject.rules
    );
    settingsTextArea.value = JSON.stringify(phishingRules, null, 4); // 4 spaces for indentation
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
        alert('Invalid rules: missing include or exclude fields!');
        return;
      }
      storage.updateRules(rules);
      alert('Rules saved!');
    } catch (e: any) {
      alert(`Invalid rules!`);
    }
  }
}

function initializeReport(): void {
  // // @ts-ignore
  // chrome.webNavigation.onCompleted.addListener(async details => {
  //   const rules = await storage.getRules();
  //   const engine = new Engine(...rules);
  //   const results = engine.detect(details.url);
  //   const resultWithHighestScore = results
  //     .sort((a, b) => {
  //       if (a.phishingProbability > b.phishingProbability) {
  //         return -1;
  //       } else {
  //         return 1;
  //       }
  //     })
  //     .map(v => v.phishingProbability)
  //     .pop()
  //     .toFixed(1);
  //   console.log('Navigation completed:', resultWithHighestScore);
  // });
}

function initialize(): void {
  // Show rules
  showRules();

  // Initialize listener
  initializeReport();

  const updateBtn = document.querySelector('button');
  if (updateBtn) {
    updateBtn.addEventListener('click', () => updateRules());
  }
}

// Init settings page
initialize();
