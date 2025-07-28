import { PhishingRules } from '../../../model/phishing-rules';
import { PhishingRule } from '../../../model/phishing-rule';
import { ALL_DUTCH_KEYWORDS } from '../__boilerplate__/_all_dutch_keywords';

const SPECIFIC_ABN_AMRO_RULES: PhishingRule[] = [
  {
    name: 'abn_amro_phishing_rule',
    description: 'A phishing rule to detect ABN AMRO typosquats',
    phishingRuleType: 'regex',
    value:
      '/\\b[aA][bB][nN][aA][mM][rR][oO]\\b| \n' +
      '\\b[aA][bB][nN][aA][mM][rR][0o]\\b| \n' +
      '\\b[aA][bB][nN][aA][mM][rR][oO][wW]?\\b| \n' +
      '\\b[aA][bB][nN][aA][mM][rR][oO][.]{0,1}[cC][oO][mM]?\\b/',
    weight: 0.5
  },
  {
    name: 'abn_amro_phishing_rule',
    description: 'A phishing rule to detect ABN AMRO homoglyps',
    phishingRuleType: 'regex',
    value:
      '/\\b[aA][bB][nN][aA][mM][rR][oO]|[aA][bB][nN][aA][mM][rR][0O]|[aA][bB][nN][aA][mM][rR][оO]|[aA][bB][nN][aA][mM][rR][оO]|[aA][bB][nN][aA][mM][rR][oO][wW]?\\b/',
    weight: 0.5
  }
];

export const ABN_AMRO_RULES: PhishingRules = {
  threshold: 1,
  include: [...SPECIFIC_ABN_AMRO_RULES, ...ALL_DUTCH_KEYWORDS],
  exclude: [
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'host',
      value: 'abnamro.nl',
      weight: 99
    },
    {
      name: 'abn_phishing_exclude_rule',
      description: 'A phishing rule to detect ABN Amro phishing attempts',
      phishingRuleType: 'startswith',
      value: 'apps.apple.com',
      weight: 2
    },
    {
      name: 'abn_phishing_exclude_rule',
      description: 'A phishing rule to detect ABN Amro phishing attempts',
      phishingRuleType: 'startswith',
      value: 'play.google.com',
      weight: 2
    }
  ]
};
