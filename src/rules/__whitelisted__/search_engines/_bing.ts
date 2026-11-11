import { PhishingRule } from '../../../model/phishing-rule';

export const WHITELIST_BING: PhishingRule[] = [
  {
    name: 'bing_exclude_rule_1',
    description: 'A bing phishing exclude rule',
    phishingRuleType: 'regex',
    value:
      '^https?://(?:[a-z0-9-]+\\.)*bing\\.(?:com|(?:[a-z0-9-]+\\.)?(?:at|be|bg|ch|cy|cz|de|dk|ee|es|fi|fr|gr|hr|hu|ie|is|it|li|lt|lu|lv|me|mk|mt|nl|no|pl|pt|ro|rs|se|si|sk|ua|uk|ae|af|am|az|bd|bh|bn|bt|cn|ge|hk|id|il|in|iq|ir|jo|jp|kg|kh|kp|kr|kz|la|lb|lk|mm|mn|mo|mv|my|np|om|ph|pk|ps|qa|sa|sg|sy|th|tj|tm|tr|tw|uz|vn|ye))(?::\\d+)?(?:[/?#]|$)',
    weight: 99
  }
];
