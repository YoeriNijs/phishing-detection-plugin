/**
 * URL helpers shared by the background script and the extension pages.
 *
 * Browser extensions receive many kinds of URLs (http(s), extension pages,
 * about: pages, etc.). Only http(s) URLs should ever be scanned for phishing.
 */

export function getParsedUrl(url: string | null | undefined): URL | null {
  if (!url) {
    return null;
  }
  try {
    return new URL(url);
  } catch {
    return null;
  }
}

export function isHttpUrl(url: string | null | undefined): boolean {
  const parsed = getParsedUrl(url);
  return (
    !!parsed && (parsed.protocol === 'http:' || parsed.protocol === 'https:')
  );
}

export function getHostname(url: string | null | undefined): string | null {
  const parsed = getParsedUrl(url);
  if (
    !parsed ||
    (parsed.protocol !== 'http:' && parsed.protocol !== 'https:')
  ) {
    return null;
  }
  return parsed.hostname.toLowerCase();
}

/**
 * Returns the origin (protocol + host) of an http(s) URL, or null when the URL
 * is not a valid http(s) URL.
 */
export function getOrigin(url: string | null | undefined): string | null {
  const parsed = getParsedUrl(url);
  if (
    !parsed ||
    (parsed.protocol !== 'http:' && parsed.protocol !== 'https:')
  ) {
    return null;
  }
  return parsed.origin;
}
