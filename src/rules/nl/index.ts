import { PhishingRules } from '../../model/phishing-rules';
import { RABOBANK_RULES } from './banks/_rabobank';
import { ING_RULES } from './banks/_ing';
import { VERIFIEREN_RULES } from './misc/_verifieren';
import { NL_KEYWORDS_RULES } from './misc/_keywords';

export const DUTCH_BANKS: PhishingRules[] = [RABOBANK_RULES, ING_RULES];
export const DUTCH_MISC: PhishingRules[] = [
  NL_KEYWORDS_RULES,
  VERIFIEREN_RULES
];
export const ALL_DUTCH: PhishingRules[] = [...DUTCH_BANKS, ...DUTCH_MISC];
