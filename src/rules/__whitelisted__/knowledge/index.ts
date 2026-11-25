import { WHITELIST_WIKIPEDIA } from './_wikipedia';
import { WHITELIST_CLAUDE } from './_claude';
import { WHITELIST_CHATGPT } from './_chatgpt';
import { WHITELIST_MISTRAL } from './_mistral';

export const ALL_WHITELISTED_KNOWLEDGE_PLATFORMS = [
  ...WHITELIST_CLAUDE,
  ...WHITELIST_CHATGPT,
  ...WHITELIST_MISTRAL,
  ...WHITELIST_WIKIPEDIA
];
