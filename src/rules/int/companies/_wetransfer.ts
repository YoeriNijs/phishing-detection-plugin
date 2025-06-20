import { PhishingRules } from '../../../model/phishing-rules';

export const WETRANSFER_RULES: PhishingRules = {
  threshold: 1,
  include: [
    {
      name: 'wetransfer_rule',
      description: 'Detect WeTransfer scams',
      weight: 0.5,
      phishingRuleType: 'contains',
      value: 'wetransfer'
    },
    {
      name: 'wetransfer_rule',
      description: 'Detect WeTransfer scams',
      weight: 0.5,
      phishingRuleType: 'host',
      value: 'onrender.com'
    },
    {
      name: 'wetransfer_rule',
      description: 'Detect WeTransfer scams',
      weight: 0.5,
      phishingRuleType: 'host',
      value: 'amazonaws.com'
    },
    {
      name: 'wetransfer-rule',
      description: 'A phishing rule to detect common scam keywords',
      phishingRuleType: 'regex',
      value:
        '\\bhttps?://[^\\s/$.?#].[^\\s]*\\.(help|info|cc|xyz|tk|icu)([^\\s]*)?\\b',
      weight: 0.5
    }
  ],
  exclude: [
    {
      name: 'wetransfer_rule',
      description: 'Detect WeTransfer scams',
      weight: 1,
      phishingRuleType: 'host',
      value: 'wetransfer.com'
    }
  ]
};
