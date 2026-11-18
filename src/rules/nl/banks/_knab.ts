import { PhishingRule } from '../../../model/phishing-rule';
import { PhishingRules } from '../../../model/phishing-rules';
import { ALL_WHITELISTED } from '../../__whitelisted__';
import { ALL_DUTCH_KEYWORDS } from '../__boilerplate__/_all_dutch_keywords';

const SPECIFIC_KNAB_RULES: PhishingRule[] = [
  {
    name: 'knab_include_rule_1',
    description: 'Detect knab typosquatting',
    phishingRuleType: 'regex',
    value:
      '(?i)(?:^|[./:-])(?:knab|knba|k[nm]ab|kn[a4]b|kna[b8]|k[a-z0-9]nab|kn[a-z0-9]ab|kna[a-z0-9]b|knab[a-z0-9])(?:$|[./:?#[\\]-])',
    weight: 0.5
  },
  {
    name: 'knab_include_rule_2',
    description: 'Detect knab lookalikes',
    phishingRuleType: 'regex',
    value: '(?i)(?:^|[./:-])[kкκ][nпո][aаα][bвβ](?:$|[./:?#[\\]-])',
    weight: 0.5
  }
];

export const KNAB_RULES: PhishingRules = {
  threshold: 1,
  include: [...SPECIFIC_KNAB_RULES, ...ALL_DUTCH_KEYWORDS],
  exclude: [
    ...ALL_WHITELISTED,
    {
      name: 'knab_exclude_rule_1',
      description: 'Knab exclude rule',
      phishingRuleType: 'hostendswith',
      value: 'knab.nl',
      weight: 99
    }
  ]
};
