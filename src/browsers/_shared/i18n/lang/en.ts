import { ILanguageItem } from '../i-language-item';

export const LANG_EN: ILanguageItem[] = [
  { key: 'yes', value: 'yes' },
  { key: 'unlikely', value: 'unlikely' },
  { key: 'url', value: 'URL' },
  { key: 'is-phishing', value: 'Is phishing' },
  { key: 'probability', value: 'Probability' },
  { key: 'threshold', value: 'Threshold' },
  {
    key: 'invalid-rules-missing-fields',
    value: 'Invalid rules: missing include or exclude fields!'
  },
  { key: 'rules-saved', value: 'Rules saved!' },
  { key: 'invalid-rules', value: 'Invalid rules!' },
  {
    key: 'whitelist-domain',
    value: 'Enter the following code to whitelist the current domain'
  },
  {
    key: 'domain-whitelisted',
    value: 'The domain is added to the whitelist'
  },
  {
    key: 'invalid-code-try-again',
    value: 'Invalid code. Try again.'
  },
  { key: 'title-report', value: 'Detection Report' }
];
