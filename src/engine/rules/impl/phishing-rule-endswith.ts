import { IPhishingRuleChecker } from './i-phishing-rule-checker';
import { PhishingRuleType } from '../../../model/phishing-rule-type';
import { PhishingRule } from '../../../model/phishing-rule';

export class PhishingRuleEndsWith implements IPhishingRuleChecker {
  type(): PhishingRuleType {
    return 'endswith';
  }

  isApplicable(rule: PhishingRule, url: string): boolean {
    if (!url) {
      return false;
    }
    return url && url.endsWith(rule.value.toLowerCase());
  }
}
