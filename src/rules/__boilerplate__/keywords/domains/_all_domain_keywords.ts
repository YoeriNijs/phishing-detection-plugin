import { PhishingRule } from '../../../../model/phishing-rule';

export const ALL_DOMAIN_KEYWORDS: PhishingRule[] = [
  {
    name: 'domain_keywords_rule_1',
    description: 'Possible evil domain name rule',
    phishingRuleType: 'hostendswith',
    value: 'vercel.app',
    weight: 0.5
  },
  {
    name: 'domain_keywords_rule_2',
    description: 'Possible evil domain name rule',
    phishingRuleType: 'hostendswith',
    value: 'cprapid.com',
    weight: 1
  },
  {
    name: 'domain_keywords_rule_3',
    description: 'Possible evil domain name rule',
    phishingRuleType: 'hostendswith',
    value: 'geekever.com',
    weight: 1
  },
  {
    name: 'domain_keywords_rule_4',
    description: 'Possible evil domain name rule',
    phishingRuleType: 'hostendswith',
    value: 'pages.dev',
    weight: 0.5
  },
  {
    name: 'domain_keywords_rule_5',
    description: 'Possible evil domain name rule',
    phishingRuleType: 'hostendswith',
    value: 'weebly.com',
    weight: 1
  },
  {
    name: 'domain_keywords_rule_6',
    description: 'Possible evil domain name rule',
    phishingRuleType: 'hostendswith',
    value: 'edgeone.dev',
    weight: 1
  },
  {
    name: 'domain_keywords_rule_7',
    description: 'Possible evil domain name rule',
    phishingRuleType: 'contains',
    value: 'storage.googleapis.com',
    weight: 0.2
  },
  {
    name: 'domain_keywords_rule_7',
    description: 'Possible evil domain name rule',
    phishingRuleType: 'hostendswith',
    value: '.goog',
    weight: 1
  },
  {
    name: 'domain_keywords_rule_8',
    description: 'Possible evil domain name rule',
    phishingRuleType: 'hostendswith',
    value: 'newsingermany.com',
    weight: 1
  },
  {
    name: 'domain_keywords_rule_8',
    description: 'Possible evil domain name rule',
    phishingRuleType: 'hostendswith',
    value: 'tecnoticias.net',
    weight: 1
  }
];
