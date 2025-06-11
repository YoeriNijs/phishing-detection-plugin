import { PhishingRules } from '../../../model/phishing-rules';

export const RABOBANK_RULES: PhishingRules = {
  threshold: 0.9,
  include: [
    {
      name: 'rabo_phishing_include_rule_1',
      description: 'A phishing rule to detect rabobank phishing attempts',
      phishingRuleType: 'contains',
      value: 'rabo',
      weight: 0.5
    },
    {
      name: 'rabo_phishing_include_rule_2',
      description: 'A phishing rule to detect rabobank phishing attempts',
      phishingRuleType: 'contains',
      value: 'rbobank',
      weight: 1
    },
    {
      name: 'rabo_phishing_include_rule_3',
      description: 'A phishing rule to detect rabobank phishing attempts',
      phishingRuleType: 'contains',
      value: 'rabobnk',
      weight: 1
    },
    {
      name: 'rabo_phishing_include_rule_4',
      description: 'A phishing rule to detect rabobank phishing attempts',
      phishingRuleType: 'contains',
      value: 'rabbank',
      weight: 1
    },
    {
      name: 'rabo_phishing_include_rule_5',
      description: 'A phishing rule to detect rabobank phishing attempts',
      phishingRuleType: 'contains',
      value: 'rаbo',
      weight: 1
    },
    {
      name: 'rabo_phishing_include_rule_6',
      description: 'A phishing rule to detect rabobank phishing attempts',
      phishingRuleType: 'contains',
      value: 'bаnk',
      weight: 1
    }
  ],
  exclude: [
    {
      name: 'rabo_phishing_exclude_rule_1',
      description: 'A phishing rule to detect rabobank phishing attempts',
      phishingRuleType: 'contains',
      value: 'rabobank.nl/',
      weight: 1
    },
    {
      name: 'rabo_phishing_exclude_rule_2',
      description: 'A phishing rule to detect rabobank phishing attempts',
      phishingRuleType: 'endswith',
      value: 'rabobank.nl',
      weight: 1
    }
  ]
};
