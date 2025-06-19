import { PhishingRules } from '../../../model/phishing-rules';

export const BREWERIES_RULES: PhishingRules = {
  threshold: 1,
  include: [
    {
      name: 'brewery_gamification_rule_1',
      description: 'Brewery gamification rule',
      weight: 1,
      phishingRuleType: 'regex',
      value: '^https?:\\/\\/([a-zA-Z0-9-]+\\.)?(www\\.)?wplnkr\\.cc(\\/.*)?$'
    }
  ]
};
