import { PhishingRule } from '../../../model/phishing-rule';

export const WHITELIST_AVROTROS: PhishingRule[] = [
  {
    name: 'avrotros_exclude_rule_1',
    description: 'An avrotros phishing exclude rule',
    phishingRuleType: 'host',
    value: 'avrotros.nl',
    weight: 99
  }
];
