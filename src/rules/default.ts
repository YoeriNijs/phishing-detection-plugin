import { PhishingRules } from '../model/phishing-rules';
import { ALL_DUTCH } from './nl';
import { ALL_INTERNATIONAL } from './int';
import { ALL_WHITELISTED } from './__whitelisted__';
import { PhishingRule } from '../model/phishing-rule';
import { ALL_BOILERPLATE } from './__boilerplate__';

interface DefaultRules {
  version: number;
  generalRules: {
    include?: PhishingRule[];
    exclude?: PhishingRule[];
  };
  specificRules: PhishingRules[];
}

export const mapDefaultRules = (rules: DefaultRules): PhishingRules[] => {
  return rules.specificRules.map(sp => {
    return Object.assign(sp, {
      include:
        sp.include && rules.generalRules.include
          ? sp.include.concat(rules.generalRules.include)
          : undefined,
      exclude:
        sp.exclude && rules.generalRules.exclude
          ? sp.exclude.concat(rules.generalRules.exclude)
          : undefined
    });
  });
};

export const DEFAULT_RULES_VERSION = 1;

export const DEFAULT_RULES: DefaultRules = {
  version: DEFAULT_RULES_VERSION, // Version pinning for future changes
  generalRules: {
    include: ALL_BOILERPLATE,
    exclude: ALL_WHITELISTED
  },
  specificRules: [...ALL_INTERNATIONAL, ...ALL_DUTCH]
};

export const isDefaultRules = (value: any): value is DefaultRules => {
  if (!value['version']) {
    return false;
  }
  if (!value['generalRules'] || !Array.isArray(value['generalRules'])) {
    return false;
  }
  return !(!value['specificRules'] || !Array.isArray(value['specificRules']));
};

export const INITIAL_RULES: PhishingRules[] = mapDefaultRules(DEFAULT_RULES);
