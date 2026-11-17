import { IPhishingRuleChecker } from './i-phishing-rule-checker';
import { PhishingRuleType } from '../../../model/phishing-rule-type';
import { PhishingRule } from '../../../model/phishing-rule';

export abstract class AbstractPhishingRuleHostChecker
  implements IPhishingRuleChecker
{
  abstract isApplicable(rule: PhishingRule, url: string): boolean;
  abstract type(): PhishingRuleType;

  protected getHostName(url: string): string | null {
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
