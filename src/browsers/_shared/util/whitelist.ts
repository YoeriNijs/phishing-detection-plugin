import { getHostname } from './url-util';

/**
 * Extracts the host from a whitelist entry.
 *
 * Whitelist entries are stored as origins (e.g. https://example.com), but
 * older versions of the plugin may have stored bare hosts or URLs with a
 * path. All of those formats are supported here.
 */
export function getWhitelistedHost(
  entry: string | null | undefined
): string | null {
  if (!entry || typeof entry !== 'string') {
    return null;
  }

  const value = entry.trim().toLowerCase();
  if (!value) {
    return null;
  }

  try {
    const url = value.includes('://') ? value : `http://${value}`;
    const hostname = new URL(url).hostname.toLowerCase();
    return normalizeHostname(hostname);
  } catch {
    return null;
  }
}

/**
 * Normalizes a hostname for whitelist comparisons:
 *
 * - removes a trailing dot (`example.com.`)
 * - removes a leading `www.` so whitelisting `www.example.com` also covers
 *   `example.com` (and the other way around)
 */
function normalizeHostname(hostname: string): string | null {
  if (!hostname) {
    return null;
  }

  const withoutTrailingDot = hostname.replace(/\.$/, '');
  if (
    withoutTrailingDot.startsWith('www.') &&
    withoutTrailingDot.slice(4).includes('.')
  ) {
    return withoutTrailingDot.slice(4);
  }
  return withoutTrailingDot;
}

/**
 * Checks whether a URL is whitelisted.
 *
 * Matching is done on the hostname, not on a raw string prefix. This fixes two
 * problems with the previous implementation:
 *
 * - `https://example.com.evil.com` is NOT whitelisted by `https://example.com`.
 * - `https://EXAMPLE.com` IS whitelisted by `https://example.com`.
 *
 * A whitelisted domain also covers its subdomains (e.g. `login.example.com`),
 * which matches the intent of whitelisting a domain.
 */
export function isWhitelistedUrl(
  url: string | null | undefined,
  whitelistedUrls: string[] | null | undefined
): boolean {
  const hostname = normalizeHostname(getHostname(url) || '');
  if (!hostname || !Array.isArray(whitelistedUrls)) {
    return false;
  }

  return whitelistedUrls.some(entry => {
    const whitelistedHost = getWhitelistedHost(entry);
    if (!whitelistedHost) {
      return false;
    }
    return (
      hostname === whitelistedHost || hostname.endsWith(`.${whitelistedHost}`)
    );
  });
}
