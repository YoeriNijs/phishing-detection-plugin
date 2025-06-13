import { IPhishingRuleChecker } from './i-phishing-rule-checker';
import { PhishingRuleType } from '../../../model/phishing-rule-type';
import { PhishingRule } from '../../../model/phishing-rule';

export class PhishingRuleStartsWith implements IPhishingRuleChecker {
  type(): PhishingRuleType {
    return 'startswith';
  }

  isApplicable(rule: PhishingRule, url: string): boolean {
    if (url.startsWith('http')) {
      const urlWithoutHttp = url.replace('http://', '')
        .replace('https://', '');
      return urlWithoutHttp.startsWith(rule.value.toLowerCase());
    }
    return url.startsWith(rule.value.toLowerCase());
  }
}
