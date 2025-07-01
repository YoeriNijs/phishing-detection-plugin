import { PhishingRules } from '../../../model/phishing-rules';

export const NL_KEYWORDS_RULES: PhishingRules = {
  threshold: 1,
  include: [
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect aanmaning with dots in between',
      phishingRuleType: 'regex',
      value: '(?=.*\\.)a\\.?a\\.?n\\.?m\\.?a\\.?n\\.?i\\.?n\\.?g',
      weight: 1
    },
    {
      name: 'nl_keyword',
      description:
        'A phishing rule to detect voorkombeslag with dots in between',
      phishingRuleType: 'regex',
      value:
        '(?=.*\\.)v\\.?o\\.?o\\.?r\\.?k\\.?o\\.?m\\.?b\\.?e\\.?s\\.?l\\.?a\\.?g',
      weight: 1
    },
    {
      name: 'nl_keyword',
      description:
        'A phishing rule to detect belastingdienst with dots in between',
      phishingRuleType: 'regex',
      value:
        '(?=.*\\.)b\\.?e\\.?l\\.?a\\.?s\\.?t\\.?i\\.?n\\.?g\\.?d\\.?i\\.?en\\.?s\\.?t',
      weight: 1
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect deurwaarder with dots in between',
      phishingRuleType: 'regex',
      value: '(?=.*\\.)d\\.?e\\.?u\\.?r\\.?w\\.?a\\.?a\\.?r\\.?d\\.?e\\.?r',
      weight: 1
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect aangifte with dots in between',
      phishingRuleType: 'regex',
      value: '(?=.*\\.)a\\.?a\\.?n\\.?g\\.?i\\.?f\\.?t\\.?e',
      weight: 1
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'regex',
      value:
        '\\bhttps?://[^\\s/$.?#].[^\\s]*\\.(help|info|cc|xyz|tk|icu)([^\\s]*)?\\b',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'contains',
      value: 'opwaardeer',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'contains',
      value: 'veilig',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'contains',
      value: 'waarschuwing',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'contains',
      value: 'opwaarderen',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'contains',
      value: 'deurwaarder',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'contains',
      value: 'verifieren',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'contains',
      value: 'verifieer',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'contains',
      value: 'verificatie',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'contains',
      value: 'geverifieerd',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'contains',
      value: 'betalen',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'contains',
      value: 'betaal',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'contains',
      value: 'betaling',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'contains',
      value: 'boete',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'contains',
      value: 'sturen',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'contains',
      value: 'stuur',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'contains',
      value: 'factuur',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'contains',
      value: 'rekening',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'contains',
      value: 'nota',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'contains',
      value: 'voorkom',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'contains',
      value: 'update',
      weight: 0.3
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'contains',
      value: 'bijwerken',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'contains',
      value: 'bericht',
      weight: 0.3
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'contains',
      value: 'dringend',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'contains',
      value: 'spoedig',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'contains',
      value: 'direct',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'contains',
      value: 'actie',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'contains',
      value: 'reactie',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'contains',
      value: 'betaalgegevens',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'contains',
      value: 'bevestig',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'contains',
      value: 'teruggave',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'contains',
      value: 'vordering',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'contains',
      value: 'vernieuw',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'contains',
      value: 'openstaand',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'contains',
      value: 'herinnering',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'contains',
      value: 'berichtenbox',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'contains',
      value: 'pakket',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'contains',
      value: 'vervang',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'contains',
      value: 'blokkade',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'contains',
      value: 'opnieuw',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'contains',
      value: 'aangifte',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'contains',
      value: 'toegang',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'contains',
      value: 'belangrijk',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'contains',
      value: 'urgent',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'contains',
      value: 'alert',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'contains',
      value: 'persoonlijk',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'contains',
      value: 'betaalpas',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'contains',
      value: 'beveiliging',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'contains',
      value: 'noodzakelijk',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'contains',
      value: 'actualiseer',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'contains',
      value: 'actualiseren',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'contains',
      value: 'bezorging',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'contains',
      value: 'wijziging',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'contains',
      value: 'identificatie',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'contains',
      value: 'document',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'contains',
      value: 'aanmaning',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'contains',
      value: 'douanekosten',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'contains',
      value: 'overtreding',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'contains',
      value: 'factuur',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'contains',
      value: 'ideal',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'contains',
      value: 'ontvang',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'contains',
      value: 'tikkie',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'contains',
      value: 'winactie',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'contains',
      value: 'bedrag',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'contains',
      value: 'kenmerk',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'contains',
      value: 'belasting',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'contains',
      value: 'herstel',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'contains',
      value: 'odido',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'contains',
      value: 'kpn',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'contains',
      value: 'ziggo',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'contains',
      value: 'vodafone',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'contains',
      value: 'simkaart',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'contains',
      value: 'sim-kaart',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'contains',
      value: 'sim-',
      weight: 0.5
    }
  ],
  exclude: [
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'host',
      value: 'ing.nl',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'host',
      value: 'abnamro.nl',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'host',
      value: 'rabobank.nl',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'host',
      value: 'bunq.nl',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'host',
      value: 'volksbank.nl',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'host',
      value: 'sns.nl',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'host',
      value: 'triodos.nl',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'host',
      value: 'vanlanschot.nl',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'host',
      value: 'knab.nl',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'host',
      value: 'bitvavo.nl',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'host',
      value: 'rijksoverheid.nl',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'host',
      value: 'belastingdienst.nl',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'host',
      value: 'mijnoverheid.nl',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'host',
      value: 'cjib.nl',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'host',
      value: 'digid.nl',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'host',
      value: 'politie.nl',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'host',
      value: 'kvk.nl',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'host',
      value: 'postnl.nl',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'host',
      value: 'kpn.nl',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'host',
      value: 'odido.nl',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'host',
      value: 'vodafone.nl',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'host',
      value: 'ziggo.nl',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'host',
      value: 'essent.nl',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'host',
      value: 'eneco.nl',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'host',
      value: 'vattenfall.nl',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'host',
      value: 'energiedirect.nl',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'host',
      value: 'bol.com',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'host',
      value: 'facebook.com',
      weight: 0.3
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'host',
      value: 'instagram.com',
      weight: 0.3
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'host',
      value: 'anwb.nl',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'host',
      value: 'coolblue.nl',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'host',
      value: 'tweakers.net',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'host',
      value: 'microsoft.com',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'host',
      value: 'google.com',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'host',
      value: 'revolut.com',
      weight: 0.5
    },
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'host',
      value: 'sumup.com',
      weight: 0.5
    }
  ]
};
