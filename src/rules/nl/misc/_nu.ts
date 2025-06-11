import { PhishingRules } from '../../../model/phishing-rules';

// TODO Just for testing purposes, remove in prod
export const NU_RULES: PhishingRules = {
  threshold: 0.4,
  include: [
    {
      name: 'nu_phishing_include_rule_1',
      description: 'A phishing rule to detect nu.nl phishing attempts',
      phishingRuleType: 'contains',
      value: 'nu.nl',
      weight: 0.5
    }
  ],
  exclude: []
};
