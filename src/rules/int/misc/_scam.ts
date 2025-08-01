import { PhishingRules } from '../../../model/phishing-rules';

export const SCAM_RULES: PhishingRules = {
  threshold: 1,
  include: [
    {
      name: 'scam_rule',
      description: 'Detect scams',
      weight: 1,
      phishingRuleType: 'regex',
      value: '[s5$][cÃ§][a4@][mÐ¼]'
    }
  ]
};
