import { PhishingRules } from '../../../model/phishing-rules';

export const ING_RULES: PhishingRules = {
  threshold: 0.9,
  include: [
    {
      name: 'ing_phishing_include_rule_1',
      description: 'A phishing rule to detect ING phishing attempts',
      phishingRuleType: 'contains',
      value: 'ing',
      weight: 0.5
    }
  ],
  exclude: [
    {
      name: 'ing_phishing_exclude_rule_1',
      description: 'A phishing rule to detect ING phishing attempts',
      phishingRuleType: 'contains',
      value: 'ing.nl/',
      weight: 1
    },
    {
      name: 'ing_phishing_exclude_rule_2',
      description: 'A phishing rule to detect ING phishing attempts',
      phishingRuleType: 'endswith',
      value: 'ing.nl',
      weight: 1
    }
  ]
};
