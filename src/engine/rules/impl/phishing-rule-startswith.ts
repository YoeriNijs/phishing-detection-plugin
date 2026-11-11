import { IPhishingRuleChecker } from './i-phishing-rule-checker';
import { PhishingRuleType } from '../../../model/phishing-rule-type';
import { PhishingRule } from '../../../model/phishing-rule';

export class PhishingRuleStartsWith implements IPhishingRuleChecker {
  type(): PhishingRuleType {
    return 'startswith';
  }

  isApplicable(rule: PhishingRule, url: string): boolean {
    if (!rule || !rule.value || !url) {
      return false;
    }

    const normalizedUrl = url.toLowerCase();
    const value = rule.value.toLowerCase();

    if (normalizedUrl.startsWith('http')) {
      const urlWithoutHttp = normalizedUrl.replace(/^https?:\/\//, '');
      return urlWithoutHttp.startsWith(value);
    }
    return normalizedUrl.startsWith(value);
  }
}
