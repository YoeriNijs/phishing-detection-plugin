import { LANG_NL } from './lang/nl';
import { LANG_EN } from './lang/en';
import { ILanguageItem } from './i-language-item';

export class I18n {
  constructor() {
    // do not instantiate
  }

  static translate(key: string) {
    const languageSet = this.determineLanguageSet();
    const translation = languageSet.find(
      k => k.key.toLowerCase() === key.toLowerCase()
    );
    if (translation) {
      return translation.value;
    } else {
      return key; // Just return the key
    }
  }

  static translateI18NElements(): void {
    document.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('i18n').forEach(element => {
        if (element.childNodes.length > 0) {
          element.childNodes.forEach(node => {
            const key = node.textContent;
            node.textContent = I18n.translate(key);
          });
        }
      });
    });
  }

  private static determineLanguageSet() {
    const userLocale = navigator.language.toLowerCase();
    let set: ILanguageItem[] = [];
    switch (true) {
      // On Chrome the locale is 'nl-NL', while on Firefox it is just 'nl'
      case userLocale.includes('nl'):
        set = LANG_NL;
        break;
      // On Chrome the locale is 'en-EN', while on Firefox it is just 'en'
      case userLocale.includes('en'):
      default:
        set = LANG_EN;
        break;
    }
    return set;
  }
}
