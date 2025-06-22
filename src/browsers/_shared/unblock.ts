import {
  createStorageForBrowserImpl,
  getBrowserImpl
} from './util/browser-util';
import { I18n } from './i18n/i18n';

let code: number = null;
let codeByUser: number[] = [];

const getRandomNumber = (): number => {
  return Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
};

const showUserCode = (number: string) => {
  const userCode = document.querySelector('p.user-code');
  if (userCode) {
    const textNode = document.createTextNode(number);
    userCode.append(textNode);
  }
};

const clearUserCode = () => {
  const userCode = document.querySelector('p.user-code');
  if (userCode) {
    userCode.innerHTML = '';
  }
};

const codeElement = document.querySelector('p.code');
if (codeElement) {
  code = getRandomNumber();
  codeElement.textContent = `${I18n.translate('whitelist-domain')}: ${code}`;
}

const calculatorBtns = document.querySelectorAll('.row button');
if (calculatorBtns) {
  calculatorBtns.forEach((btn: HTMLButtonElement) => {
    btn.addEventListener('click', () => {
      const submitBtn: HTMLButtonElement =
        document.querySelector('button.submit');
      if (submitBtn) {
        submitBtn.disabled = false;
      }
      const calculatorValue = btn.textContent;
      if (calculatorValue === '<<') {
        clearUserCode();
        codeByUser.pop();
        codeByUser.forEach(c => showUserCode(`${c}`));
      } else {
        codeByUser.push(+calculatorValue);
        showUserCode(calculatorValue);
      }
    });
  });
}

const submitBtn: HTMLButtonElement = document.querySelector('button.submit');
if (submitBtn) {
  submitBtn.addEventListener('click', () => {
    if (Number(codeByUser.join('')) === code) {
      const storage = createStorageForBrowserImpl();
      storage.getTempUrl((domain: string) => {
        storage.addWhitelistedUrl(domain);

        // Notify
        alert(I18n.translate('domain-whitelisted'));

        // Close current window
        const browserImpl = getBrowserImpl();
        browserImpl.tabs.query({ active: true, currentWindow: true }, tabs => {
          browserImpl.tabs.remove(tabs[0].id);
        });
      });
    } else {
      submitBtn.disabled = true;
      codeByUser = [];
      clearUserCode();
      alert(I18n.translate('invalid-code-try-again'));
    }
  });
}
