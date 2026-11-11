import { WHITELIST_BING } from './_bing';
import { WHITELIST_DUCKDUCKGO } from './_duckduckgo';
import { WHITELIST_ECOSIA } from './_ecosia';
import { WHITELIST_GOOGLE } from './_google';
import { WHITELIST_QWANT } from './_qwant';

export const ALL_WHITELISTED_SEARCH_ENGINES = [
  ...WHITELIST_BING,
  ...WHITELIST_DUCKDUCKGO,
  ...WHITELIST_ECOSIA,
  ...WHITELIST_GOOGLE,
  ...WHITELIST_QWANT
];
