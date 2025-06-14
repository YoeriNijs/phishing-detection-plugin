import { ChromeStorage } from './storage';
import { DEFAULT_RULES } from '../../rules/default';

function getRandomNumber(): number {
  return Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
}

const btnEl: HTMLButtonElement = document.querySelector('button');
if (btnEl) {
  btnEl.addEventListener('click', () => {
    const storage = new ChromeStorage(DEFAULT_RULES);
    storage.getActiveHost(activeUrl => {
      const code = getRandomNumber(); // We need a better solution to make it more unattractive to unblock the page
      const answer = prompt(
        `Type the following code to whitelist the current host '${activeUrl}': ${code}`
      );
      debugger;
      if (`${answer}` === `${code}`) {
        storage.addWhitelistedUrl(activeUrl);
        alert('Current web domain is now whitelisted');
      } else {
        alert('Invalid code. Try again.');
      }
    });
  });
}
