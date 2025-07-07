import { PhishingRules } from '../../../model/phishing-rules';
import { PhishingRule } from '../../../model/phishing-rule';
import { ALL_DUTCH_KEYWORDS } from '../__boilerplate__/_all_dutch_keywords';

const SPECIFIC_BUNQ_RULES: PhishingRule[] = [
  {
    name: 'bunq_phishing_rule',
    description: 'A phishing rule to detect bunq typosquats',
    phishingRuleType: 'regex',
    value:
      '\\b[b6][uuv][nм][qg]\\b|\\bbunq\\b|\\b[b6][uuv][nм][qg]{0,1}\\w{0,2}\\b|\\b[b6][uuv]{0,1}[nм]{0,1}[qg]{0,1}\\w{0,2}\\b',
    weight: 0.5
  },
  {
    name: 'bunq_phishing_rule',
    description: 'A phishing rule to detect bunq homoglyps',
    phishingRuleType: 'regex',
    value:
      '\\b[6b][uuv][nм][qg9]\\b|\\bbunq\\b|\\b[6b][uuv]{0,1}[nм]{0,1}[qg9]{0,1}\\w{0,2}\\b',
    weight: 0.5
  }
];

export const BUNQ_RULES: PhishingRules = {
  threshold: 1,
  include: [...SPECIFIC_BUNQ_RULES, ...ALL_DUTCH_KEYWORDS],
  exclude: [
    {
      name: 'nl_keyword',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'host',
      value: 'bunq.nl',
      weight: 99
    },
    {
      name: 'bunq_phishing_exclude_rule',
      description: 'A phishing rule to detect bunq phishing attempts',
      phishingRuleType: 'startswith',
      value: 'apps.apple.com',
      weight: 2
    },
    {
      name: 'bunq_phishing_exclude_rule',
      description: 'A phishing rule to detect bunq phishing attempts',
      phishingRuleType: 'startswith',
      value: 'play.google.com',
      weight: 2
    }
  ]
};
