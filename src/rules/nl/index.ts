import { PhishingRules } from '../../model/phishing-rules';
import { DUTCH_BANKS } from './banks';
import { DUTCH_COMPANIES } from './companies';

export const ALL_DUTCH: PhishingRules[] = [...DUTCH_BANKS, ...DUTCH_COMPANIES];
