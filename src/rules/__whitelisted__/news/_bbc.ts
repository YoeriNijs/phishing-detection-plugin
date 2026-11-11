import { PhishingRule } from '../../../model/phishing-rule';

export const WHITELIST_BBC: PhishingRule[] = [
  {
    name: 'bbc_exclude_rule_1',
    description: 'A bbc phishing exclude rule',
    phishingRuleType: 'host',
    value: 'bbc.com',
    weight: 99
  }
];
