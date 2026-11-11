import { PhishingRule } from '../../../model/phishing-rule';

export const WHITELIST_KREBS: PhishingRule[] = [
  {
    name: 'krebs_exclude_rule_1',
    description: 'A krebs phishing exclude rule',
    phishingRuleType: 'host',
    value: 'krebsonsecurity.com',
    weight: 99
  }
];
