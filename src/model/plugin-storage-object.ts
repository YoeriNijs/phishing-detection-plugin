import { PhishingRules } from './phishing-rules';

export interface PluginStorageObject {
  settings: {
    rules: PhishingRules[];
    whitelistedUrls: string[];
    lastKnownPhishingUrl?: string;
  };
}
