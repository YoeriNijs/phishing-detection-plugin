import { ICS_RULES } from './_ics';
import { PhishingRules } from '../../../model/phishing-rules';
import { MISC_BANK_RULES } from './_misc';

export const INT_BANK_RULES: PhishingRules[] = [ICS_RULES, MISC_BANK_RULES];
