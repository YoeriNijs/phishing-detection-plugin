import { PhishingRules } from '../../../model/phishing-rules';
import { BREWERIES_RULES } from './_breweries';
import { WETRANSFER_RULES } from './_wetransfer';

export const INT_COMPANIES: PhishingRules[] = [
  BREWERIES_RULES,
  WETRANSFER_RULES
];
