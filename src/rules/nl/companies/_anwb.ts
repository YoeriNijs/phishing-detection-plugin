import { PhishingRules } from '../../../model/phishing-rules';
import { NL_KEYWORDS_RULES } from '../misc/_keywords';
import { PhishingRule } from '../../../model/phishing-rule';

const SPECIFIC_ANWB_INCLUDES: PhishingRule[] = [
  {
    name: 'anwb_phishing_rule',
    description: 'A phishing rule to detect anwb phishing attempts',
    phishingRuleType: 'regex',
    value: '[aɑα𝒶𝓪][nип𝓷][wʍ𝓌][bɓ𝒷𝓫]',
    weight: 0.5
  }
];

const COMMON_NL_KEYWORDS = NL_KEYWORDS_RULES.include;

export const ANWB_RULES: PhishingRules = {
  threshold: 1,
  include: [...SPECIFIC_ANWB_INCLUDES, ...COMMON_NL_KEYWORDS],
  exclude: [
    {
      name: 'anwb_phishing_exclude_rule',
      description: 'A anwb phishing exlude rule',
      phishingRuleType: 'host',
      value: 'anwb.nl',
      weight: 1
    },
    {
      name: 'anwb_phishing_exclude_rule',
      description: 'A anwb phishing exlude rule',
      phishingRuleType: 'host',
      value: 'icscards.nl',
      weight: 1
    }
  ]
};
