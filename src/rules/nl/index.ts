import { PhishingRules } from '../../model/phishing-rules';
import { DUTCH_BANKS } from './banks';
import { DUTCH_COMPANIES } from './companies';
import { DUTCH_ISP } from './isp';

export const ALL_DUTCH: PhishingRules[] = [
  ...DUTCH_BANKS,
  ...DUTCH_COMPANIES,
  ...DUTCH_ISP
];
