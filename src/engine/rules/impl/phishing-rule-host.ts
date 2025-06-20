import { IPhishingRuleChecker } from './i-phishing-rule-checker';
import { PhishingRuleType } from '../../../model/phishing-rule-type';
import { PhishingRule } from '../../../model/phishing-rule';

class InvalidHostError extends Error {
  constructor(msg: string) {
    super(msg);
  }
}

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
    let urlToCheck = url;
    if (!url.startsWith('http')) {
      urlToCheck = `http://${url}`; // Otherwise we cannot validate it using the URL class
    }
    const baseUrl = this.getHostName(urlToCheck);
    return baseUrl.toLowerCase() === rule.value.toLowerCase();
  }

  private getHostName(url: string): string {
    try {
      const parsedUrl = new URL(url);
      const hostParts = parsedUrl.hostname.split('.');

      // Check if there are at least two parts (e.g., "example.com")
      if (hostParts.length >= 2) {
        // Return the last two parts (e.g., "example.com")
        return hostParts.slice(-2).join('.');
      } else {
        // If there's only one part, return it as is
        return parsedUrl.hostname;
      }
    } catch (error) {
      throw new InvalidHostError('Invalid URL:' + error);
    }
  }
}
