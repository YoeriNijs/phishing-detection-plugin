import { PhishingRule } from '../../../model/phishing-rule';

export const WHITELIST_POLITIE: PhishingRule[] = [
  {
    name: 'politie_exclude_rule_1',
    description: 'A politie phishing exclude rule',
    phishingRuleType: 'host',
    value: 'politie.nl',
    weight: 99
  },
  {
    name: 'politie_exclude_rule_2',
    description: 'A politie phishing exclude rule',
    phishingRuleType: 'host',
    value: 'politie.be',
    weight: 99
  }
];
