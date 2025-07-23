import { I18n } from '../i18n';

describe('I18n tests', () => {
  it('should translate text inside i18n elements on DOMContentLoaded', () => {
    // Setup
    Object.defineProperty(window.navigator, 'language', {
      value: 'nl-NL',
      configurable: true
    });

    document.body.innerHTML = `
      <i18n>yes</i18n>
      <i18n>unlikely</i18n>
    `;

    I18n.translateI18NElements();

    // Execute
    const event = new Event('DOMContentLoaded');
    document.dispatchEvent(event);

    // Verify
    const i18nElements = document.querySelectorAll('i18n');

    expect(i18nElements.length).toBe(2);
    const [cn1, cn2] = i18nElements;
    expect(cn1.textContent).toBe('ja');
    expect(cn2.textContent).toBe('onwaarschijnlijk');
  });

  it('should translate a key that exists', () => {
    Object.defineProperty(window.navigator, 'language', {
      value: 'nl-NL',
      configurable: true
    });
    const translation = I18n.translate('yes');
    expect(translation).toBe('ja');
  });

  it('should translate the value if the key does not exist', () => {
    Object.defineProperty(window.navigator, 'language', {
      value: 'nl-NL',
      configurable: true
    });
    const translation = I18n.translate('this-does-totally-not-exist');
    expect(translation).toBe('this-does-totally-not-exist');
  });

  it('should translate value with %s', () => {
    Object.defineProperty(window.navigator, 'language', {
      value: 'nl-NL',
      configurable: true
    });
    const translation = I18n.translate(
      'domain-whitelisted',
      'https://www.google.com'
    );
    expect(translation).toBe(
      "Het domein 'https://www.google.com' is uitgesloten."
    );
  });
});
