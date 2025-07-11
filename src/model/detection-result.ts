import { PhishingRule } from './phishing-rule';

export interface DetectionResult {
  isPhishing: boolean;
  phishingProbability: number;
  threshold: number;
  matchingRules: { include: PhishingRule[]; exclude: PhishingRule[] };
}
