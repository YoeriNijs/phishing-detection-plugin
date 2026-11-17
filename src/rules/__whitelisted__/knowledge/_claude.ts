import { PhishingRule } from '../../../model/phishing-rule';

export const WHITELIST_CLAUDE: PhishingRule[] = [
  {
    name: 'claude_exclude_rule_1',
    description: 'A claude phishing exclude rule',
    phishingRuleType: 'host',
    value: 'claude.com',
    weight: 99
  }
];
