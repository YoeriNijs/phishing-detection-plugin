import { PhishingRule } from '../../../model/phishing-rule';

export const WHITELIST_GITHUB: PhishingRule[] = [
  {
    name: 'github_exclude_rule_1',
    description: 'A github phishing exclude rule',
    phishingRuleType: 'host',
    value: 'github.com',
    weight: 99
  }
];
