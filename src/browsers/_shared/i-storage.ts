import { PhishingRules } from '../../model/phishing-rules';

export interface IStorage {
  getRules(fn: (rules: PhishingRules[]) => void): void;

  updateRules(rules_sets: PhishingRules[]): void;

  getWhitelistedUrls(fn: (urls: string[]) => void): void;

  addWhitelistedUrl(url: string): void;

  updateTempUrl(tempUrl: string): void;

  getTempUrl(fn: (url: string) => void): void;
}
