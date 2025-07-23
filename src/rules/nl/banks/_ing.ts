import { PhishingRules } from '../../../model/phishing-rules';
import { PhishingRule } from '../../../model/phishing-rule';
import { ALL_DUTCH_KEYWORDS } from '../__boilerplate__/_all_dutch_keywords';

const SPECIFIC_ING_RULES: PhishingRule[] = [
  {
    name: 'ing_phishing_include_rule_1',
    description: 'A phishing rule to detect ING phishing attempts',
    phishingRuleType: 'startswith',
    value: 'ing',
    weight: 0.5
  },
  {
    name: 'ing_phishing_include_rule_2',
    description: 'A phishing rule to detect ING phishing attempts',
    phishingRuleType: 'endswith',
    value: 'ing',
    weight: 0.5
  },
  {
    name: 'ing_phishing_include_rule_3',
    description: 'A phishing rule to detect ING phishing attempts',
    phishingRuleType: 'regex',
    value: '[-_]*ing[-_]+|[-_]+ing[-_]*',
    weight: 0.5
  },
  {
    name: 'ing_phishing_include_rule_4',
    description: 'A phishing rule to detect ING phishing attempts',
    phishingRuleType: 'regex',
    value: '[-_]*nl[-_]+|[-_]+nl[-_]*',
    weight: 0.5
  },
  {
    name: 'ing_phishing_include_rule_5',
    description: 'A phishing rule to detect ING phishing attempts',
    phishingRuleType: 'contains',
    value: 'íng',
    weight: 1
  },
  {
    name: 'ing_phishing_include_rule_6',
    description: 'A phishing rule to detect ING phishing attempts',
    phishingRuleType: 'contains',
    value: 'ïng',
    weight: 1
  }
];

export const ING_RULES: PhishingRules = {
  threshold: 1,
  include: [...SPECIFIC_ING_RULES],
  exclude: [
    {
      name: 'ing_exclude_rule',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'host',
      value: 'ing.nl',
      weight: 99
    },
    {
      name: 'ing_phishing_exclude_rule',
      description: 'A phishing rule to detect ING phishing attempts',
      phishingRuleType: 'startswith',
      value: 'apps.apple.com',
      weight: 2
    },
    {
      name: 'ing_phishing_exclude_rule',
      description: 'A phishing rule to detect ING phishing attempts',
      phishingRuleType: 'startswith',
      value: 'play.google.com',
      weight: 2
    }
  ]
};
