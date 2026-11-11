import { IPhishingRuleChecker } from './i-phishing-rule-checker';
import { PhishingRuleType } from '../../../model/phishing-rule-type';
import { PhishingRule } from '../../../model/phishing-rule';

export class PhishingRuleContains implements IPhishingRuleChecker {
  type(): PhishingRuleType {
    return 'contains';
  }

  isApplicable(rule: PhishingRule, url: string): boolean {
    if (!rule || !rule.value || !url) {
      return false;
    }
    if (rule.value.length < 1) {
      return false;
    }
    return url.toLowerCase().includes(rule.value.toLowerCase());
  }
}
