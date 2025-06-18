import { ChromeStorage } from './storage';

function getRandomNumber(): number {
  return Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
}

const btnEl: HTMLButtonElement = document.querySelector('button');
if (btnEl) {
  btnEl.addEventListener('click', () => {
    const code = getRandomNumber(); // We need a better solution to make it more unattractive to unblock the page
    const answer = prompt(
      `Type the following code to whitelist the current domain: ${code}`
    );
    if (`${answer}` === `${code}`) {
      const storage = new ChromeStorage();
      storage.getTempUrl((domain: string) => {
        storage.addWhitelistedUrl(domain);

        // Notify
        alert(`Domain ${domain} is whitelisted!`);

        // Close current window
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
          chrome.tabs.remove(tabs[0].id);
        });
      });
    } else {
      alert('Invalid code. Try again.');
    }
  });
}
