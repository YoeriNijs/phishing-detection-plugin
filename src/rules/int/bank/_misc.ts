// TODO Just for testing purposes, remove in prod
import { PhishingRules } from '../../../model/phishing-rules';

export const MISC_BANK_RULES: PhishingRules = {
  threshold: 0.2,
  include: [
    {
      name: 'int_bank_phishing_include_rule_1',
      description: 'A phishing rule to detect bank phishing attempts',
      phishingRuleType: 'contains',
      value: 'bnk-',
      weight: 0.5
    },
    {
      name: 'int_bank_phishing_include_rule_2',
      description: 'A phishing rule to detect bank phishing attempts',
      phishingRuleType: 'startswith',
      value: 'bnk-',
      weight: 0.8
    }
  ],
  exclude: []
};
