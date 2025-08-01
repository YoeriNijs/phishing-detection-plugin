import { PhishingRules } from '../../../model/phishing-rules';

export const PHISHING_ACTORS_RULES: PhishingRules = {
  threshold: 1,
  include: [
    {
      name: 'scam_rule',
      description: 'Responsible for launching phishing panels',
      weight: 1,
      phishingRuleType: 'host',
      value: '3-a.net'
    },
    {
      name: 'scam_rule',
      description: 'Belongs to phishing panel',
      weight: 1,
      phishingRuleType: 'contains',
      value: 'phish-bypass'
    },
    {
      name: 'scam_rule',
      description: 'Belongs to phishing panel',
      weight: 1,
      phishingRuleType: 'contains',
      value: 'atok='
    }
  ]
};
