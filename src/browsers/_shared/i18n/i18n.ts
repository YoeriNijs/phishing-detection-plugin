import { LANG_NL } from './lang/nl';
import { LANG_EN } from './lang/en';
import { ILanguageItem } from './i-language-item';

export function getTranslationForKey(key: string) {
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

  const res = set.find(k => k.key.toLowerCase() === key.toLowerCase());
  if (res) {
    return res.value;
  } else {
    return key; // Just return the key
  }
}
