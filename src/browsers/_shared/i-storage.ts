import { PhishingRules } from '../../model/phishing-rules';

export interface IStorage {
  getRules(fn: (rules: PhishingRules[]) => void): void;

  updateRules(rules_sets: PhishingRules[]): Promise<void>;

  getWhitelistedUrls(fn: (urls: string[]) => void): void;

  addWhitelistedUrl(url: string): Promise<void>;

  updateLastKnownPhishingUrl(url: string): Promise<void>;

  getTempUrl(fn: (url?: string) => void): void;
}
