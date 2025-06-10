import { PhishingRules } from "../model/phishing-rules";

export const DEFAULT_RULES: PhishingRules = {
  include: [
    {
      name: "bank_include_rule_1",
      description: "Default phishing detection rule for banks",
      value: "nu.nl",
      weight: 0.91,
      phishingRuleType: "contains",
    }
  ],
  exclude: [],
};
