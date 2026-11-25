import { PhishingRule } from '../../../model/phishing-rule';

export const WHITELIST_MISTRAL: PhishingRule[] = [
  {
    name: 'mistral_exclude_rule_1',
    description: 'A mistral phishing exclude rule',
    phishingRuleType: 'host',
    value: 'mistral.ai',
    weight: 99
  }
];
