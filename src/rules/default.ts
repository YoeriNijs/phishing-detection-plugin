import { PhishingRules } from '../model/phishing-rules';
import { ALL_DUTCH } from './nl';
import { ALL_INTERNATIONAL } from './int';

export const DEFAULT_RULES: PhishingRules[] = [
  ...ALL_INTERNATIONAL,
  ...ALL_DUTCH
];
