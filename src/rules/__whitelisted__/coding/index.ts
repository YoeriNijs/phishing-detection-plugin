import { WHITELIST_BITBUCKET } from './_bitbucket';
import { WHITELIST_CODEBERG } from './_codeberg';
import { WHITELIST_GITHUB } from './_github';
import { WHITELIST_GITLAB } from './_gitlab';

export const ALL_WHITELISTED_CODING_PLATFORMS = [
  ...WHITELIST_BITBUCKET,
  ...WHITELIST_CODEBERG,
  ...WHITELIST_GITHUB,
  ...WHITELIST_GITLAB
];
