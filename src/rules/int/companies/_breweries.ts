import { PhishingRules } from '../../../model/phishing-rules';
import { ALL_WHITELISTED } from '../../__whitelisted__';

export const BREWERIES_RULES: PhishingRules = {
  threshold: 1,
  include: [
    {
      name: 'brewery_gamification_rule_1',
      description: 'Brewery gamification rule',
      weight: 1,
      phishingRuleType: 'regex',
      value:
        '^https?:\\/\\/([a-zA-Z0-9-]+\\.)?(www\\.)?wplnkr\\.(help|info|cc|xyz|tk|icu)(\\/.*)?$'
    }
  ],
  exclude: [...ALL_WHITELISTED]
};
