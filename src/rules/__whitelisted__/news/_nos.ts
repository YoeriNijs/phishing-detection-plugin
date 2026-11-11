import { PhishingRule } from '../../../model/phishing-rule';

export const WHITELIST_NOS: PhishingRule[] = [
  {
    name: 'nos_exclude_rule_1',
    description: 'A nos phishing exclude rule',
    phishingRuleType: 'host',
    value: 'nos.nl',
    weight: 99
  }
];
