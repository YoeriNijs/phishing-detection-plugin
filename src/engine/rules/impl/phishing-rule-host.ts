import { IPhishingRuleChecker } from './i-phishing-rule-checker';
import { PhishingRuleType } from '../../../model/phishing-rule-type';
import { PhishingRule } from '../../../model/phishing-rule';

export class PhishingRuleHost implements IPhishingRuleChecker {
  type(): PhishingRuleType {
    return 'host';
  }

  isApplicable(rule: PhishingRule, url: string): boolean {
    if (!rule || !rule.value) {
      return false;
    }
    if (rule.value.length < 1) {
      return false;
    }
    const parsedUrl = new URL(url);
    const baseUrl = parsedUrl.host.replace('www.', '');
    return baseUrl.toLowerCase() === rule.value.toLowerCase();
  }
}
