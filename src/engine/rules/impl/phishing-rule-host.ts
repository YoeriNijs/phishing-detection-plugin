import { PhishingRuleType } from '../../../model/phishing-rule-type';
import { PhishingRule } from '../../../model/phishing-rule';
import { AbstractPhishingRuleHostChecker } from './abstract-phishing-rule-host-checker';

export class PhishingRuleHost extends AbstractPhishingRuleHostChecker {
  type(): PhishingRuleType {
    return 'host';
  }

  isApplicable(rule: PhishingRule, url: string): boolean {
    if (!rule || !rule.value || !url) {
      return false;
    }
    if (rule.value.length < 1) {
      return false;
    }

    const hostname = this.getHostName(url);
    if (!hostname) {
      return false;
    }

    const value = rule.value.toLowerCase();
    return hostname === value || hostname.endsWith(`.${value}`);
  }
}
