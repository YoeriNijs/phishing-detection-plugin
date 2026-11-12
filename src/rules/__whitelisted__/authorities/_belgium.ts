import { PhishingRule } from '../../../model/phishing-rule';

export const WHITELIST_BELGIUM: PhishingRule[] = [
  {
    name: 'belgium_exclude_rule_1',
    description: 'A belgium phishing exclude rule',
    phishingRuleType: 'host',
    value: 'belgium.be',
    weight: 99
  }
];
