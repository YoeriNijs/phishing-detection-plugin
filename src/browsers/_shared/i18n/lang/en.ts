import { ILanguageItem } from '../i-language-item';

export const LANG_EN: ILanguageItem[] = [
  { key: 'yes', value: 'yes' },
  { key: 'unlikely', value: 'unlikely' },
  { key: 'url', value: 'URL' },
  { key: 'save', value: 'Save' },
  { key: 'is-phishing', value: 'Is phishing' },
  { key: 'probability', value: 'Probability' },
  { key: 'threshold', value: 'Threshold' },
  { key: 'rules', value: 'Rules' },
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
    value: 'The domain is added to the whitelist.'
  },
  {
    key: 'domain-whitelist-warning',
    value:
      'WARNING! Whitelisting a domain can result in phishing. Do you really want to add this domain to the whitelist?'
  },
  {
    key: 'invalid-code-try-again',
    value: 'Invalid code. Try again.'
  },
  { key: 'title-report', value: 'Detection Report' },
  { key: 'possible-phishing-attempt', value: 'Possible phishing attempt' },
  {
    key: 'possible-phishing-attempt-details',
    value:
      'The request you made is a possible phishing attempt. Please check the URL and try again.'
  },
  { key: 'phishing-settings-title', value: 'Phishing Detection Settings' },
  { key: 'whitelist-button', value: 'Whitelist current page' }
];
