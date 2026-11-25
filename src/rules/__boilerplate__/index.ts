import { PhishingRule } from '../../model/phishing-rule';
import { ALL_DUTCH_KEYWORDS } from './keywords/dutch/_all_dutch_keywords';
import { ALL_DOMAIN_KEYWORDS } from './keywords/domains/_all_domain_keywords';

export const ALL_BOILERPLATE: PhishingRule[] = [
  ...ALL_DOMAIN_KEYWORDS,
  ...ALL_DUTCH_KEYWORDS
];
