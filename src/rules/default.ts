import { PhishingRules } from "../model/phishing-rules";

export const DEFAULT_RULES: PhishingRules = {
  include: [
    {
      name: "rabo_phishing_rule_1",
      description: "A phishing rule to detect rabobank phishing attempts",
      phishingRuleType: "contains",
      value: "rabo",
      weight: 0.91,
    },
  ],
  exclude: [
    {
      name: "rabo_phishing_rule_2",
      description: "A phishing rule to detect valid rabobank urls",
      phishingRuleType: "contains",
      value: "rabobank.nl",
      weight: 0.5,
    },
  ],
};
