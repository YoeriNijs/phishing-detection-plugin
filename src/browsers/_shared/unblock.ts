import {
  createStorageForBrowserImpl,
  getBrowserImpl
} from './util/browser-util';
import { I18n } from './i18n/i18n';
import { IStorage } from './i-storage';

let code: number | null = null;
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
    userCode.textContent = '';
  }
};

const getTempUrl = (storage: IStorage): Promise<string | undefined> => {
  return new Promise(resolve => storage.getTempUrl(resolve));
};

const closeActiveTab = async (): Promise<void> => {
  const browserImpl = getBrowserImpl();
  const tabs = await browserImpl.tabs.query({
    active: true,
    currentWindow: true
  });
  if (tabs.length > 0 && tabs[0].id !== undefined) {
    await browserImpl.tabs.remove(tabs[0].id);
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
      const calculatorValue = btn.textContent;
      if (calculatorValue === '<<') {
        clearUserCode();
        codeByUser.pop();
        codeByUser.forEach(c => showUserCode(`${c}`));
      } else {
        codeByUser.push(+calculatorValue);
        showUserCode(calculatorValue);
      }

      const submitBtn: HTMLButtonElement =
        document.querySelector('button.submit');
      const userCode = document.querySelector('p.user-code');
      if (submitBtn && userCode) {
        const nUserCode = userCode.textContent.length;
        submitBtn.disabled = nUserCode < 4;
      }
    });
  });
}

const submitBtn: HTMLButtonElement = document.querySelector('button.submit');
if (submitBtn) {
  submitBtn.addEventListener('click', async () => {
    if (code === null || Number(codeByUser.join('')) !== code) {
      submitBtn.disabled = true;
      codeByUser = [];
      clearUserCode();
      alert(I18n.translate('invalid-code-try-again'));
      return;
    }

    const confirmed = confirm(I18n.translate('domain-whitelist-warning'));
    if (!confirmed) {
      return;
    }

    const storage = createStorageForBrowserImpl();
    const domain = await getTempUrl(storage);
    if (!domain) {
      alert(I18n.translate('unknown-domain'));
      return;
    }

    // Wait for the whitelist to be persisted before closing the tab. Otherwise
    // the background script may still read the old whitelist when the user
    // navigates to the domain again.
    await storage.addWhitelistedUrl(domain);

    alert(I18n.translate('domain-whitelisted', domain));

    try {
      await closeActiveTab();
    } catch (error) {
      console.error('Could not close the blocked tab', error);
    }
  });
}

I18n.translateI18NElements();
