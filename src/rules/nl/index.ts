import { PhishingRules } from '../../model/phishing-rules';
import { RABOBANK_RULES } from './banks/_rabobank';
import { ING_RULES } from './banks/_ing';
import { NU_RULES } from './misc/_nu';

export const DUTCH_BANKS: PhishingRules[] = [RABOBANK_RULES, ING_RULES];
export const ALL_DUTCH = DUTCH_BANKS.concat(NU_RULES);
