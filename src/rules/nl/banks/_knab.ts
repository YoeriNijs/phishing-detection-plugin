import { PhishingRule } from '../../../model/phishing-rule';
import { PhishingRules } from '../../../model/phishing-rules';

const SPECIFIC_KNAB_RULES: PhishingRule[] = [
  {
    name: 'knab_include_rule_1',
    description: 'Detect knab typosquatting',
    phishingRuleType: 'contains',
    value: '/\\b(?:knab|kanb|knba|nkab|knabb|kknab)\\b/',
    weight: 0.5
  }
];

export const KNAB_RULES: PhishingRules = {
  threshold: 1,
  include: [...SPECIFIC_KNAB_RULES],
  exclude: [
    {
      name: 'knab_exclude_rule_1',
      description: 'Knab exclude rule',
      phishingRuleType: 'hostendswith',
      value: 'knab.nl',
      weight: 99
    }
  ]
};
