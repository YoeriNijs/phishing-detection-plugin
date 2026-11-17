import { WHITELIST_WIKIPEDIA } from './_wikipedia';
import { WHITELIST_CLAUDE } from './_claude';
import { WHITELIST_CHATGPT } from './_chatgpt';

export const ALL_WHITELISTED_KNOWLEDGE_PLATFORMS = [
  ...WHITELIST_CLAUDE,
  ...WHITELIST_CHATGPT,
  ...WHITELIST_WIKIPEDIA
];
