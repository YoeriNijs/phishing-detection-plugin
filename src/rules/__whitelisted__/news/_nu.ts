import { PhishingRule } from '../../../model/phishing-rule';

export const WHITELIST_NU: PhishingRule[] = [
  {
    name: 'nu_exclude_rule_1',
    description: 'A Nu.nl phishing exclude rule',
    phishingRuleType: 'host',
    value: 'nu.nl',
    weight: 99
  }
];
