import { WHITELIST_BBC } from './_bbc';
import { WHITELIST_BLEEPING_COMPUTER } from './_bleepingcomputer';
import { WHITELIST_CNN } from './_cnn';
import { WHITELIST_NU } from './_nu';
import { WHITELIST_TWEAKERS } from './_tweakers';

export const ALL_WHITELISTED_NEWS = [
  ...WHITELIST_BBC,
  ...WHITELIST_BLEEPING_COMPUTER,
  ...WHITELIST_CNN,
  ...WHITELIST_NU,
  ...WHITELIST_TWEAKERS
];
