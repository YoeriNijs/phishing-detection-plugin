import { IPhishingRuleChecker } from './i-phishing-rule-checker';
import { PhishingRuleType } from '../../../model/phishing-rule-type';
import { PhishingRule } from '../../../model/phishing-rule';

export class PhishingRuleHost implements IPhishingRuleChecker {
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

  private getHostName(url: string): string | null {
    let urlToCheck = url.trim();
    if (!/^https?:\/\//i.test(urlToCheck)) {
      urlToCheck = `http://${urlToCheck}`;
    }

    try {
      return new URL(urlToCheck).hostname.toLowerCase();
    } catch (error) {
      console.warn(`Invalid URL while checking host rule: ${url}`, error);
      return null;
    }
  }
}
