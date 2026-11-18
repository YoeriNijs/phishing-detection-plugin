import { PhishingRuleType } from '../../../model/phishing-rule-type';
import { PhishingRule } from '../../../model/phishing-rule';
import { AbstractPhishingRuleHostChecker } from './abstract-phishing-rule-host-checker';

export class PhishingRuleHostEndsWith extends AbstractPhishingRuleHostChecker {
  type(): PhishingRuleType {
    return 'hostendswith';
  }

  isApplicable(rule: PhishingRule, url: string): boolean {
    if (!rule || !rule.value || !url) {
      return false;
    }
    const hostname = this.getHostName(url);
    if (!hostname) {
      return false;
    }

    const value = rule.value.toLowerCase();
    return hostname.toLowerCase().endsWith(value);
  }
}
