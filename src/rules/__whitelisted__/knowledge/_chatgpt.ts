import { PhishingRule } from '../../../model/phishing-rule';

export const WHITELIST_CHATGPT: PhishingRule[] = [
  {
    name: 'chatgpt_exclude_rule_1',
    description: 'A chatgpt phishing exclude rule',
    phishingRuleType: 'host',
    value: 'chatgpt.com',
    weight: 99
  }
];
