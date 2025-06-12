import { PhishingRules } from '../../../model/phishing-rules';

export const VERIFIEREN_RULES: PhishingRules = {
  threshold: 0.1,
  include: [
    {
      name: 'verifieren_phishing_include_rule_1',
      description: 'A phishing rule to detect verifieren phishing attempts',
      phishingRuleType: 'contains',
      value: '-verifieren',
      weight: 1
    },
    {
      name: 'verifieren_phishing_include_rule_2',
      description: 'A phishing rule to detect verifieren phishing attempts',
      phishingRuleType: 'contains',
      value: 'verifieren-',
      weight: 1
    },
    {
      name: 'verifieren_phishing_include_rule_3',
      description: 'A phishing rule to detect verifieren phishing attempts',
      phishingRuleType: 'contains',
      value: 'verfieren',
      weight: 3
    },
    {
      name: 'verificatie_phishing_include_rule_1',
      description: 'A phishing rule to detect verificatie phishing attempts',
      phishingRuleType: 'contains',
      value: '-verificatie',
      weight: 1
    },
    {
      name: 'verificatie_phishing_include_rule_2',
      description: 'A phishing rule to detect verificatie phishing attempts',
      phishingRuleType: 'contains',
      value: 'verificatie-',
      weight: 1
    },
    {
      name: 'verificatie_phishing_include_rule_3',
      description: 'A phishing rule to detect verificatie phishing attempts',
      phishingRuleType: 'contains',
      value: 'verficatie',
      weight: 3
    }
  ],
  exclude: []
};
