import { PhishingRule } from '../../../model/phishing-rule';

export const WHITELIST_BITBUCKET: PhishingRule[] = [
  {
    name: 'bitbucket_exclude_rule_1',
    description: 'A bitbucket phishing exclude rule',
    phishingRuleType: 'host',
    value: 'bitbucket.com',
    weight: 99
  }
];
