import { PhishingRules } from '../../../model/phishing-rules';

export const ICS_RULES: PhishingRules = {
  threshold: 1,
  include: [
    {
      name: 'ics_include_rule_with_homoglyphs_1',
      description:
        'A rule that matches on the value "ics-" with all possible homoglyphs',
      value: '[iIl1|][cC(<][sS5$][-–—]',
      weight: 1,
      phishingRuleType: 'regex'
    },
    {
      name: 'ics_include_rule_with_homoglyphs_2',
      description:
        'A rule that matches on the value "-ics" with all possible homoglyphs',
      value: '[-–—][iIl1|][cC(<][sS5$]',
      weight: 1,
      phishingRuleType: 'regex'
    },
    {
      name: 'ics_include_rule_with_homoglyphs_3',
      description:
        'A rule that matches on the value "icscard(s)" and "ics-card(s)" with all possible homoglyphs',
      value: '[i1l|]c[s5](-|)?[cçk]{1}[a4@]r[d|](s?)?',
      weight: 1,
      phishingRuleType: 'regex'
    }
  ],
  exclude: [
    {
      name: 'ics_exclude_rule_1',
      description: 'All official ics sites',
      value: '^icscards\\.(nl|de|com)$',
      weight: -1,
      phishingRuleType: 'regex'
    }
  ]
};
