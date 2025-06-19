import { ILanguageItem } from '../i-language-item';

export const LANG_NL: ILanguageItem[] = [
  { key: 'yes', value: 'ja' },
  { key: 'unlikely', value: 'onwaarschijnlijk' },
  { key: 'url', value: 'URL' },
  { key: 'is-phishing', value: 'Is phishing' },
  { key: 'probability', value: 'Waarschijnlijkheid' },
  { key: 'threshold', value: 'Drempelwaarde' },
  {
    key: 'invalid-rules-missing-fields',
    value: 'Ongeldige regels: include- of exclude-velden missen!'
  },
  { key: 'rules-saved', value: 'Regels opgeslagen!' },
  { key: 'invalid-rules', value: 'Ongeldige regels!' },
  {
    key: 'whitelist-domain',
    value: 'Voer de volgende code in om het huidige domein te whitelisten'
  },
  {
    key: 'domain-whitelisted',
    value: 'Het domein is toegevoegd aan de whitelist'
  },
  {
    key: 'invalid-code-try-again',
    value: 'Ongeldige code. Probeer opnieuw.'
  },
  { key: 'title-report', value: 'Detectierapport' }
];
