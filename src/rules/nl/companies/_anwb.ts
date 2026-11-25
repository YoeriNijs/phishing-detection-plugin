import { PhishingRules } from '../../../model/phishing-rules';
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

export const ANWB_RULES: PhishingRules = {
  threshold: 1,
  include: [...SPECIFIC_ANWB_INCLUDES],
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
