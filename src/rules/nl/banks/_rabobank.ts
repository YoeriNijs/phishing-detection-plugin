import { PhishingRules } from '../../../model/phishing-rules';
import { PhishingRule } from '../../../model/phishing-rule';
import { NL_KEYWORDS_RULES } from '../misc/_keywords';

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
    name: 'rabo_phishing_include_rule_9',
    description: 'A phishing rule to detect rabobank phishing attempts',
    phishingRuleType: 'contains',
    value: '.com',
    weight: 0.5
  },
  {
    name: 'rabo_phishing_include_rule_10',
    description: 'A phishing rule to detect rabobank phishing attempts',
    phishingRuleType: 'contains',
    value: '.cc',
    weight: 0.5
  },
  {
    name: 'rabo_phishing_include_rule_11',
    description: 'A phishing rule to detect rabobank phishing attempts',
    phishingRuleType: 'contains',
    value: '.info',
    weight: 0.5
  },
  {
    name: 'rabo_phishing_include_rule_12',
    description: 'A phishing rule to detect rabobank phishing attempts',
    phishingRuleType: 'contains',
    value: '.xyz',
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

const GENERIC_NL_KEYWORDS: PhishingRule[] = NL_KEYWORDS_RULES.include;

export const RABOBANK_RULES: PhishingRules = {
  threshold: 1,
  include: [...SPECIFIC_RABOBANK_RULES, ...GENERIC_NL_KEYWORDS],
  exclude: [
    {
      name: 'rabo_phishing_exclude_rule_1',
      description: 'A phishing rule to detect rabobank phishing attempts',
      phishingRuleType: 'startswith',
      value: 'www.rabobank.nl',
      weight: 2
    },
    {
      name: 'rabo_phishing_exclude_rule_2',
      description: 'A phishing rule to detect rabobank phishing attempts',
      phishingRuleType: 'startswith',
      value: 'rabobank.nl',
      weight: 2
    },
    {
      name: 'rabo_phishing_exclude_rule_3',
      description: 'A phishing rule to detect rabobank phishing attempts',
      phishingRuleType: 'startswith',
      value: 'www.rabo-clubsupport.nl',
      weight: 2
    },
    {
      name: 'rabo_phishing_exclude_rule_4',
      description: 'A phishing rule to detect rabobank phishing attempts',
      phishingRuleType: 'startswith',
      value: 'rabo-clubsupport.nl',
      weight: 2
    },
    {
      name: 'rabo_phishing_exclude_rule_5',
      description: 'A phishing rule to detect rabobank phishing attempts',
      phishingRuleType: 'endswith',
      value: 'rabobank.nl',
      weight: 2
    },
    {
      name: 'rabo_phishing_exclude_rule_6',
      description: 'A phishing rule to detect rabobank phishing attempts',
      phishingRuleType: 'startswith',
      value: 'media.rabobank.com',
      weight: 2
    },
    {
      name: 'rabo_phishing_exclude_rule_7',
      description: 'A phishing rule to detect rabobank phishing attempts',
      phishingRuleType: 'startswith',
      value: 'rabobank.com',
      weight: 2
    },
    {
      name: 'rabo_phishing_exclude_rule_8',
      description: 'A phishing rule to detect rabobank phishing attempts',
      phishingRuleType: 'startswith',
      value: 'www.rabobank.com',
      weight: 2
    },
    {
      name: 'rabo_phishing_exclude_rule_9',
      description: 'A phishing rule to detect rabobank phishing attempts',
      phishingRuleType: 'startswith',
      value: 'apps.apple.com',
      weight: 2
    },
    {
      name: 'rabo_phishing_exclude_rule_10',
      description: 'A phishing rule to detect rabobank phishing attempts',
      phishingRuleType: 'startswith',
      value: 'play.google.com',
      weight: 2
    }
  ]
};
