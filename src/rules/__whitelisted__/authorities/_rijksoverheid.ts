import { PhishingRule } from '../../../model/phishing-rule';

export const WHITELIST_RIJKSOVERHEID: PhishingRule[] = [
  {
    name: 'rijksoverheid_exclude_rule_1',
    description: 'A rijksoverheid phishing exclude rule',
    phishingRuleType: 'host',
    value: 'rijksoverheid.nl',
    weight: 99
  }
];
