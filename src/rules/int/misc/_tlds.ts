import { PhishingRules } from '../../../model/phishing-rules';

export const TLDS_RULES: PhishingRules = {
  threshold: 1,
  include: [
    {
      name: 'tlds_rule_1',
      description: 'Detect phishing tlds',
      weight: 1,
      phishingRuleType: 'regex',
      value: String.raw`\.(?:top|xin|xyz|bond|vip|info|online|sbs|cfd|icu|cyou|lol|support|work|ru|casa|cc|qpon|site|skin|pics|shop)(?::\d+)?(?:[/?#]|$)`
    }
  ]
};
