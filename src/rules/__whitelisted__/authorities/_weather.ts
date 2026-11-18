import { PhishingRule } from '../../../model/phishing-rule';

export const WHITELIST_WEATHER: PhishingRule[] = [
  {
    name: 'weather_exclude_rule_1',
    description: 'A knmi phishing exclude rule',
    phishingRuleType: 'host',
    value: 'knmi.nl',
    weight: 99
  },
  {
    name: 'weather_exclude_rule_2',
    description: 'A weather phishing exclude rule',
    phishingRuleType: 'host',
    value: 'meteo.be',
    weight: 99
  },
  {
    name: 'weather_exclude_rule_3',
    description: 'A weeronline phishing exclude rule',
    phishingRuleType: 'host',
    value: 'weeronline.nl',
    weight: 99
  },
  {
    name: 'weather_exclude_rule_4',
    description: 'A weer phishing exclude rule',
    phishingRuleType: 'contains',
    value: 'weer',
    weight: 0.5
  },
  {
    name: 'weather_exclude_rule_5',
    description: 'A weer phishing exclude rule',
    phishingRuleType: 'contains',
    value: 'meteo',
    weight: 0.5
  }
];
