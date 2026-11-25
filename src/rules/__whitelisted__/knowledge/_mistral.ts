import { PhishingRule } from '../../../model/phishing-rule';

export const WHITELIST_MISTRAL: PhishingRule[] = [
  {
    name: 'mistral_exclude_rule_1',
    description: 'A mistral phishing exclude rule',
    phishingRuleType: 'regex',
    value: '(?i)^(?:[a-z0-9-]+\\.)*mistral\\.(?:com|ai)$',
    weight: 99
  }
];
