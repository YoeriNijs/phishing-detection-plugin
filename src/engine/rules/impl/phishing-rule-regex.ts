import { IPhishingRuleChecker } from './i-phishing-rule-checker';
import { PhishingRuleType } from '../../../model/phishing-rule-type';
import { PhishingRule } from '../../../model/phishing-rule';

export class PhishingRuleRegex implements IPhishingRuleChecker {
  type(): PhishingRuleType {
    return 'regex';
  }

  isApplicable(rule: PhishingRule, url: string): boolean {
    if (!rule || !rule.value || !url) {
      return false;
    }

    try {
      // A user can edit the rules from the settings page. An invalid regular
      // expression should not break the detection of all other rules.
      return new RegExp(rule.value).test(url);
    } catch (error) {
      console.warn(`Invalid regular expression in rule ${rule.name}`, error);
      return false;
    }
  }
}
