import { PhishingRule } from '../../../model/phishing-rule';

export const WHITELIST_RIJKSOVERHEID: PhishingRule[] = [
  {
    name: 'rijksoverheid_exclude_rule_1',
    description: 'A rijksoverheid phishing exclude rule',
    phishingRuleType: 'host',
    value: 'rijksoverheid.nl',
    weight: 99
  },
  {
    name: 'rijksoverheid_exclude_rule_1',
    description: 'A belastingdienst phishing exclude rule',
    phishingRuleType: 'host',
    value: 'belastingdienst.nl',
    weight: 99
  },
  {
    name: 'toeslagen_exclude_rule_1',
    description: 'A toeslagen phishing exclude rule',
    phishingRuleType: 'host',
    value: 'toeslagen.nl',
    weight: 99
  },
  {
    name: 'digid_exclude_rule_1',
    description: 'A digid phishing exclude rule',
    phishingRuleType: 'host',
    value: 'digid.nl',
    weight: 99
  },
  {
    name: 'fraudehelpdesk_exclude_rule_1',
    description: 'A fraudehelpdesk phishing exclude rule',
    phishingRuleType: 'host',
    value: 'fraudehelpdesk.nl',
    weight: 99
  }
];
