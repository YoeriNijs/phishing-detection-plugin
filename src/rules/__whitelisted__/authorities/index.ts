import { WHITELIST_POLITIE } from './_politie';
import { WHITELIST_BELGIUM } from './_belgium';
import { WHITELIST_RIJKSOVERHEID } from './_rijksoverheid';
import { WHITELIST_WEATHER } from './_weather';

export const ALL_WHITELISTED_AUTHORITIES = [
  ...WHITELIST_BELGIUM,
  ...WHITELIST_WEATHER,
  ...WHITELIST_POLITIE,
  ...WHITELIST_RIJKSOVERHEID
];
