import { PhishingRule } from '../../../model/phishing-rule';

export const WHITELIST_TLDS: PhishingRule[] = [
  {
    name: 'tld_exclude_rule_1',
    description: 'A tld phishing exclude rule',
    phishingRuleType: 'contains',
    value: '.nl',
    weight: 1
  },
  {
    name: 'tld_exclude_rule_2',
    description: 'A tld phishing exclude rule',
    phishingRuleType: 'contains',
    value: '.be',
    weight: 1
  }
];
