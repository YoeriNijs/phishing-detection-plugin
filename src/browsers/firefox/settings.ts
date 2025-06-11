import { FirefoxStorage } from "./storage";
import { DEFAULT_RULES } from "../../rules/default";
import { PhishingRules } from "../../model/phishing-rules";

const storage: FirefoxStorage = new FirefoxStorage(DEFAULT_RULES);

async function showRules() {
  const settingsTextArea: HTMLTextAreaElement =
    document.querySelector("textarea");
  if (settingsTextArea) {
    const storedRules = await storage.getRules();
    settingsTextArea.value = JSON.stringify(storedRules);
  }
}

function isPhishingRules(object: any): object is PhishingRules {
  return !!object.exclude || !!object.include;
}

async function updateRules() {
  const settingsTextArea: HTMLTextAreaElement =
    document.querySelector("textarea");
  if (settingsTextArea) {
    try {
      const rules = JSON.parse(settingsTextArea.value);
      if (!isPhishingRules(rules)) {
        alert("Invalid rules: missing include or exclude fields!");
        return;
      }
      storage.updateRules(rules);
      alert("Rules saved!");
    } catch (e: any) {
      alert(`Invalid rules!`);
    }
  }
}

// Show rules
showRules();

const updateBtn = document.querySelector("button");
if (updateBtn) {
  updateBtn.addEventListener("click", () => updateRules());
}
