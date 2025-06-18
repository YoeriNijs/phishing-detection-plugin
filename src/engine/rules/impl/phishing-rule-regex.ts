import { IPhishingRuleChecker } from './i-phishing-rule-checker';
import { PhishingRuleType } from '../../../model/phishing-rule-type';
import { PhishingRule } from '../../../model/phishing-rule';

export class PhishingRuleRegex implements IPhishingRuleChecker {
  type(): PhishingRuleType {
    return 'regex';
  }

  isApplicable(rule: PhishingRule, url: string): boolean {
    if (!rule || !rule.value) {
      return false;
    }
    const regex = new RegExp(rule.value);
    return regex.test(url);
  }
}
