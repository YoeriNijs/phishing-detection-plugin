import { PhishingRule } from '../../../model/phishing-rule';

export const WHITELIST_CODEBERG: PhishingRule[] = [
  {
    name: 'codeberg_exclude_rule_1',
    description: 'A codeberg phishing exclude rule',
    phishingRuleType: 'host',
    value: 'codeberg.org',
    weight: 99
  }
];
