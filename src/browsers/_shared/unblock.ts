import {
  createStorageForBrowserImpl,
  getBrowserImpl
} from './util/browser-util';
import { getTranslationForKey } from './i18n/i18n';

function getRandomNumber(): number {
  return Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
}

const btnEl: HTMLButtonElement = document.querySelector('button');
if (btnEl) {
  btnEl.addEventListener('click', () => {
    const code = getRandomNumber(); // We need a better solution to make it more unattractive to unblock the page
    const msg = getTranslationForKey('whitelist-domain');
    const answer = prompt(`${msg}: ${code}`);
    if (`${answer}` === `${code}`) {
      const storage = createStorageForBrowserImpl();
      storage.getTempUrl((domain: string) => {
        storage.addWhitelistedUrl(domain);

        // Notify
        alert(getTranslationForKey('domain-whitelisted'));

        // Close current window
        const browserImpl = getBrowserImpl();
        browserImpl.tabs.query({ active: true, currentWindow: true }, tabs => {
          browserImpl.tabs.remove(tabs[0].id);
        });
      });
    } else {
      alert(getTranslationForKey('invalid-code-try-again'));
    }
  });
}
