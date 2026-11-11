import { isWhitelistedUrl, getWhitelistedHost } from '../util/whitelist';

describe('Whitelist URL matching', () => {
  it('should match the exact host', () => {
    expect(
      isWhitelistedUrl('https://example.com/login', ['https://example.com'])
    ).toBe(true);
  });

  it('should match subdomains of a whitelisted domain', () => {
    expect(
      isWhitelistedUrl('https://login.example.com', ['https://example.com'])
    ).toBe(true);
  });

  it('should ignore the protocol', () => {
    expect(
      isWhitelistedUrl('http://example.com', ['https://example.com'])
    ).toBe(true);
  });

  it('should be case insensitive', () => {
    expect(
      isWhitelistedUrl('https://EXAMPLE.COM', ['https://example.com'])
    ).toBe(true);
  });

  it('should support legacy bare host entries', () => {
    expect(isWhitelistedUrl('https://example.com', ['example.com'])).toBe(true);
  });

  it('should treat www and non-www as the same domain', () => {
    expect(
      isWhitelistedUrl('https://example.com', ['https://www.example.com'])
    ).toBe(true);
    expect(
      isWhitelistedUrl('https://www.example.com', ['https://example.com'])
    ).toBe(true);
  });

  it('should not whitelist a domain that only starts with the whitelisted domain', () => {
    expect(
      isWhitelistedUrl('https://example.com.evil.test', ['https://example.com'])
    ).toBe(false);
    expect(
      isWhitelistedUrl('https://notexample.com', ['https://example.com'])
    ).toBe(false);
  });

  it('should not match unrelated domains', () => {
    expect(isWhitelistedUrl('https://evil.test', ['https://example.com'])).toBe(
      false
    );
  });

  it.each([undefined, null, '', 'not a url'])(
    'should return false for invalid url %s',
    url => {
      expect(isWhitelistedUrl(url, ['https://example.com'])).toBe(false);
    }
  );

  it('should ignore invalid whitelist entries', () => {
    expect(
      isWhitelistedUrl('https://example.com', ['', null, 'not a url'])
    ).toBe(false);
  });

  it('should extract the host from different whitelist formats', () => {
    expect(getWhitelistedHost('https://example.com/path')).toBe('example.com');
    expect(getWhitelistedHost('example.com/path')).toBe('example.com');
    expect(getWhitelistedHost('http://example.com:8080')).toBe('example.com');
    expect(getWhitelistedHost('')).toBeNull();
  });
});
