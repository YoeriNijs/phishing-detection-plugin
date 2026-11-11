import { PhishingRule } from '../../../model/phishing-rule';

export const WHITELIST_GITLAB: PhishingRule[] = [
  {
    name: 'gitlab_exclude_rule_1',
    description: 'A gitlab phishing exclude rule',
    phishingRuleType: 'host',
    value: 'gitlab.com',
    weight: 99
  }
];
