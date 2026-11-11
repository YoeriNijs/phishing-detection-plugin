import { PhishingRule } from '../../../model/phishing-rule';

export const WHITELIST_CNN: PhishingRule[] = [
  {
    name: 'cnn_exclude_rule_1',
    description: 'A cnn phishing exclude rule',
    phishingRuleType: 'host',
    value: 'cnn.com',
    weight: 99
  }
];
