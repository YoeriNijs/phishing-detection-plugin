import { INITIAL_RULES } from '../default';

describe('Rules', () => {
  it.each(INITIAL_RULES)('should be able to test regex for rule %s', rules => {
    (rules.include || [])
      .filter(r => r.phishingRuleType === 'regex')
      .forEach(r => {
        try {
          new RegExp(r.value).test('');
        } catch (e) {
          throw new Error(
            `Unable to parse include rule ${r.name}. Value: ${r.value}`
          );
        }
      });

    (rules.exclude || [])
      .filter(r => r.phishingRuleType === 'regex')
      .forEach(r => {
        try {
          new RegExp(r.value).test('');
        } catch (e) {
          throw new Error(
            `Unable to parse exclude rule ${r.name}. Value: ${r.value}`
          );
        }
      });
  });
});
