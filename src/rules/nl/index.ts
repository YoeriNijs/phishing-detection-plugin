import { PhishingRules } from '../../model/phishing-rules';
import { RABOBANK_RULES } from './banks/_rabobank';
import { ING_RULES } from './banks/_ing';
import { NU_RULES } from './misc/_nu';
import { VERIFIEREN_RULES } from './misc/_verifieren';

export const DUTCH_BANKS: PhishingRules[] = [RABOBANK_RULES, ING_RULES];
export const DUTCH_MISC: PhishingRules[] = [NU_RULES, VERIFIEREN_RULES];
export const ALL_DUTCH: PhishingRules[] = [...DUTCH_BANKS, ...DUTCH_MISC];
