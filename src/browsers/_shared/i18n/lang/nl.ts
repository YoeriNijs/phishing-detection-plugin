import { ILanguageItem } from '../i-language-item';

export const LANG_NL: ILanguageItem[] = [
  { key: 'yes', value: 'ja' },
  { key: 'unlikely', value: 'onwaarschijnlijk' },
  { key: 'url', value: 'URL' },
  { key: 'save', value: 'Opslaan' },
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
    value: 'Voer de volgende code in om het huidige domein uit te sluiten'
  },
  {
    key: 'domain-whitelisted',
    value: 'Het domein is uitgesloten'
  },
  {
    key: 'invalid-code-try-again',
    value: 'Ongeldige code. Probeer opnieuw.'
  },
  { key: 'title-report', value: 'Detectierapport' },
  { key: 'possible-phishing-attempt', value: 'Mogelijke phishingpoging' },
  {
    key: 'possible-phishing-attempt-details',
    value:
      'Je probeerde een pagina te bezoeken waar mogelijk een phishingsite op actief is. Pas de URL aan en probeer het opnieuw.'
  },
  {
    key: 'phishing-settings-title',
    value: 'Instellingen voor phishingdetectie'
  },
  { key: 'whitelist-button', value: 'Domein uitsluiten' }
];
