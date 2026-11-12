import { WHITELIST_POLITIE } from './_politie';
import { WHITELIST_BELGIUM } from './_belgium';
import { WHITELIST_RIJKSOVERHEID } from './_rijksoverheid';

export const ALL_WHITELISTED_AUTHORITIES = [
  ...WHITELIST_BELGIUM,
  ...WHITELIST_POLITIE,
  ...WHITELIST_RIJKSOVERHEID
];
