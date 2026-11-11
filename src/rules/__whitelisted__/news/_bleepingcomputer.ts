import { PhishingRule } from '../../../model/phishing-rule';

export const WHITELIST_BLEEPING_COMPUTER: PhishingRule[] = [
  {
    name: 'bleeping_computer_exclude_rule_1',
    description: 'A bleeping computer phishing exclude rule',
    phishingRuleType: 'host',
    value: 'bleepingcomputer.com',
    weight: 99
  }
];
