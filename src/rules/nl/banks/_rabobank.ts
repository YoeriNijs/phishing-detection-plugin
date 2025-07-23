import { PhishingRules } from '../../../model/phishing-rules';
import { PhishingRule } from '../../../model/phishing-rule';
import { ALL_DUTCH_KEYWORDS } from '../__boilerplate__/_all_dutch_keywords';

const SPECIFIC_RABOBANK_RULES: PhishingRule[] = [
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
    weight: 0.5
  },
  {
    name: 'rabo_phishing_include_rule_7',
    description: 'A phishing rule to detect rabobank phishing attempts',
    phishingRuleType: 'contains',
    value: 'klantenservice',
    weight: 0.5
  },
  {
    name: 'rabo_phishing_include_rule_8',
    description: 'A phishing rule to detect rabobank phishing attempts',
    phishingRuleType: 'contains',
    value: 'verificatie',
    weight: 0.5
  },
  {
    name: 'rabo_phishing_include_rule_13',
    description: 'A phishing rule to detect common scam keywords',
    phishingRuleType: 'regex',
    value:
      '\\bhttps?://[^\\s/$.?#].[^\\s]*\\.(help|info|cc|xyz|tk|icu)([^\\s]*)?\\b',
    weight: 0.5
  }
];

export const RABOBANK_RULES: PhishingRules = {
  threshold: 1,
  include: [...SPECIFIC_RABOBANK_RULES, ...ALL_DUTCH_KEYWORDS],
  exclude: [
    {
      name: 'rabo_phishing_exclude_rule',
      description: 'A phishing rule to detect rabobank phishing attempts',
      phishingRuleType: 'host',
      value: 'rabobank.nl',
      weight: 2
    },
    {
      name: 'rabo_phishing_exclude_rule',
      description: 'A phishing rule to detect rabobank phishing attempts',
      phishingRuleType: 'host',
      value: 'rabo-clubsupport.nl',
      weight: 2
    },
    {
      name: 'rabo_phishing_exclude_rule',
      description: 'A phishing rule to detect rabobank phishing attempts',
      phishingRuleType: 'startswith',
      value: 'media.rabobank.com',
      weight: 2
    },
    {
      name: 'rabo_phishing_exclude_rule',
      description: 'A phishing rule to detect rabobank phishing attempts',
      phishingRuleType: 'startswith',
      value: 'apps.apple.com',
      weight: 2
    },
    {
      name: 'rabo_phishing_exclude_rule',
      description: 'A phishing rule to detect rabobank phishing attempts',
      phishingRuleType: 'startswith',
      value: 'play.google.com',
      weight: 2
    }
  ]
};
