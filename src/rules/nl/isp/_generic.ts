import { PhishingRules } from '../../../model/phishing-rules';
import { PhishingRule } from '../../../model/phishing-rule';
import { ALL_DUTCH_KEYWORDS } from '../__boilerplate__/_all_dutch_keywords';

const SPECIFIC_GENERIC_ISP_RULES: PhishingRule[] = [
  {
    name: 'generic_isp_phishing_typosquats',
    description: `
      This regex will match:
      "-nl"
      "n1" (typo with number)
      "n-l" (hyphenated)
      "nl" (without hyphen)
      "nl-"
      This regex will exclude:
      ".nl"
    `,
    phishingRuleType: 'regex',
    value: 'b[-]?n[l1][-]?(?!\\.nl)\\b\n',
    weight: 0.5
  },
  {
    name: 'generic_isp_phishing_homoglyps',
    description: `Regex rule for detecting "-nl" with homoglyphs`,
    phishingRuleType: 'regex',
    value: '\\b[-]?n[l1|𝑙|ℓ|l̷|ĺ|l̀|l̃|l̄|l̅|l̈|l̇|l̩|l̪|l̬|l̯]\\b',
    weight: 0.5
  },
  {
    name: 'generic_isp_phishing_homoglyps',
    description: `Regex rule for detecting "nl-" with homoglyphs`,
    phishingRuleType: 'regex',
    value: '\\bn[l1|𝑙|ℓ|l̷|ĺ|l̀|l̃|l̄|l̅|l̈|l̇|l̩|l̪|l̬|l̯][-]?\\b',
    weight: 0.5
  },
  {
    name: 'generic_isp_phishing_odido_typosquats',
    description: `A regex pattern that can find variations of the word "odido" with potential typosquats`,
    phishingRuleType: 'regex',
    value:
      '\\b[o0]?d{1,2}[i1]?d{1,2}[o0]?|[o0]?d{1,2}[i1]?d{1,2}[o0]?|[o0]?d{1,2}[i1]?d{1,2}[o0]?|[o0]?d{1,2}[i1]?d{1,2}[o0]?\\b',
    weight: 0.5
  },
  {
    name: 'generic_isp_phishing_vodafone_typosquats',
    description: `A regex pattern that can find variations of the word "vodafone" with potential typosquats`,
    phishingRuleType: 'regex',
    value:
      '\\b[v5]?[o0]?d{1,2}[a4]?f{1,2}[o0]?n{1,2}e{1,2}|[v5]?[o0]?d{1,2}[a4]?f{1,2}[o0]?n{1,2}e{1,2}|[v5]?[o0]?d{1,2}[a4]?f{1,2}[o0]?n{1,2}e{1,2}\\b',
    weight: 0.5
  },
  {
    name: 'generic_isp_phishing_kpn_typosquats',
    description: `A regex pattern that can find variations of the word "kpn" with potential typosquats`,
    phishingRuleType: 'regex',
    value:
      '\\b[k]{1,2}[p]{1,2}[n]{1,2}|[k]{1,2}[p]{1,2}[n]{1,2}|[k]{1,2}[p]{1,2}[n]{1,2}\\b',
    weight: 0.5
  },
  {
    name: 'generic_isp_phishing_ziggo_typosquats',
    description: `A regex pattern that can find variations of the word "ziggo" with potential typosquats`,
    phishingRuleType: 'regex',
    value:
      '\\b[z|2|з]{1,2}[i|1|и]{1,2}[g|9|г]{1,2}[g|9|г]{1,2}[o|0|о]{1,2}|[z|2|з]{1,2}[i|1|и]{1,2}[g|9|г]{1,2}[g|9|г]{1,2}[o|0|о]{1,2}|[z|2|з]{1,2}[i|1|и]{1,2}[g|9|г]{1,2}[g|9|г]{1,2}[o|0|о]{1,2}\\b',
    weight: 0.5
  },
  {
    name: 'generic_isp_phishing_kpn_homoglyps',
    description: `A regex pattern that can find variations of the word "kpn" with potential homoglyps`,
    phishingRuleType: 'regex',
    value: '\\b[k|к|q|K]{1,2}[p|р|P]{1,2}[n|и|N]{1,2}\\b',
    weight: 0.5
  },
  {
    name: 'generic_isp_phishing_odido_homoglyps',
    description: `A regex pattern that can find variations of the word "odido" with potential homoglyps`,
    phishingRuleType: 'regex',
    value: '\\b[o|0|о]{1,2}[d|д]{1,2}[i|1|и]{1,2}[d|д]{1,2}[o|0|о]{1,2}\\b',
    weight: 0.5
  },
  {
    name: 'generic_isp_phishing_vodafone_homoglyps',
    description: `A regex pattern that can find variations of the word "vodafone" with potential homoglyps`,
    phishingRuleType: 'regex',
    value:
      '\\b[v|v|5]{1,2}[o|0|о]{1,2}[d|д]{1,2}[a|4|а]{1,2}[f|ф]{1,2}[o|0|о]{1,2}[n|и|N]{1,2}[e|3|е]{1,2}\\b',
    weight: 0.5
  },
  {
    name: 'generic_isp_phishing_ziggo_homoglyps',
    description: `A regex pattern that can find variations of the word "ziggo" with potential homoglyps`,
    phishingRuleType: 'regex',
    value: '\\b[z|2|з]{1,2}[i|1|и]{1,2}[g|9|г]{1,2}[g|9|г]{1,2}[o|0|о]{1,2}\\b',
    weight: 0.5
  }
];

export const GENERIC_ISP_RULES: PhishingRules = {
  threshold: 1,
  include: [...SPECIFIC_GENERIC_ISP_RULES, ...ALL_DUTCH_KEYWORDS],
  exclude: [
    {
      name: 'isp_odido_exclude',
      description: 'An Odido exclude rule',
      phishingRuleType: 'host',
      value: 'odido.nl',
      weight: 1
    },
    {
      name: 'isp_vodafone_exclude',
      description: 'A Vodafone exclude rule',
      phishingRuleType: 'host',
      value: 'vodafone.nl',
      weight: 1
    },
    {
      name: 'isp_vodafone_exclude',
      description: 'A Vodafone exclude rule',
      phishingRuleType: 'host',
      value: 'vodafone.com',
      weight: 1
    },
    {
      name: 'isp_vodafone_exclude',
      description: 'A Ziggo exclude rule',
      phishingRuleType: 'host',
      value: 'ziggo.nl',
      weight: 1
    },
    {
      name: 'isp_vodafone_exclude',
      description: 'A KPN exclude rule',
      phishingRuleType: 'host',
      value: 'kpn.com',
      weight: 1
    },
    {
      name: '.nl',
      description: 'dot nl',
      phishingRuleType: 'contains',
      value: '.nl',
      weight: 0.5
    }
  ]
};
