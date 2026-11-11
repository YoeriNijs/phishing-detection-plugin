import { PhishingRule } from '../../../model/phishing-rule';

export const WHITELIST_TWEAKERS: PhishingRule[] = [
  {
    name: 'tweakers_exclude_rule_1',
    description: 'A tweakers phishing exclude rule',
    phishingRuleType: 'host',
    value: 'tweakers.net',
    weight: 99
  },
  {
    name: 'tweakers_exclude_rule_1',
    description: 'A tweakers phishing exclude rule',
    phishingRuleType: 'host',
    value: 'tweakers.nl',
    weight: 99
  }
];
