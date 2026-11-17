import { PhishingRule } from '../../../model/phishing-rule';

export const WHITELIST_TLDS: PhishingRule[] = [
  {
    name: 'tld_exclude_rule_1',
    description: 'A tld phishing exclude rule',
    phishingRuleType: 'hostendswith',
    value: '.nl',
    weight: 1
  },
  {
    name: 'tld_exclude_rule_2',
    description: 'A tld phishing exclude rule',
    phishingRuleType: 'hostendswith',
    value: '.be',
    weight: 1
  },
  {
    name: 'tld_exclude_rule_3',
    description: 'A tld phishing exclude rule',
    phishingRuleType: 'hostendswith',
    value: '.com',
    weight: 1
  },
  {
    name: 'tld_exclude_rule_4',
    description: 'A tld phishing exclude rule',
    phishingRuleType: 'hostendswith',
    value: 'gov.uk',
    weight: 1
  },
  {
    name: 'tld_exclude_rule_5',
    description: 'A tld phishing exclude rule',
    phishingRuleType: 'hostendswith',
    value: 'gov',
    weight: 1
  }
];
