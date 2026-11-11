import { ICommunity } from './_i-community';

export class StevenBlackCache {
  private static CACHED_FEED: string[] = null;

  private constructor() {
    // Do not instantiate
  }

  static updateCache(value: string[]): void {
    StevenBlackCache.CACHED_FEED = value;
  }

  static getCache(): string[] | null {
    return StevenBlackCache.CACHED_FEED;
  }
}

export class StevenBlack implements ICommunity {
  private readonly _feed_url =
    'https://raw.githubusercontent.com/StevenBlack/hosts/master/hosts';

  async fetch(): Promise<string[]> {
    const cachedValue = StevenBlackCache.getCache();
    if (cachedValue === null) {
      try {
        const response = await fetch(this._feed_url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const text = await response.text();
        const value = this.filterDomains(text);
        StevenBlackCache.updateCache(value);
        return value;
      } catch (error) {
        console.error('Fetch error:', error);
        throw error; // Rethrow the error for handling in the calling code
      }
    } else {
      return Promise.resolve(cachedValue);
    }
  }

  private filterDomains(text: string): string[] {
    const blockedDomains: Set<string> = new Set();

    for (const line of text.split(/\r?\n/)) {
      const content = line.split('#')[0].trim();
      if (!content) continue;

      const [, ...domains] = content.split(/\s+/);

      for (const domain of domains) {
        const cleanDomain = domain.trim();
        if (cleanDomain !== '' && !this.isWhitelisted(cleanDomain)) {
          blockedDomains.add(cleanDomain.toLowerCase());
        }
      }
    }

    return Array.from(blockedDomains);
  }

  private isWhitelisted(domain: string) {
    switch (domain.toLowerCase()) {
      case 'localhost':
      case 'local':
      case '127.0.0.1':
      case '0.0.0.0':
        return true;
      default:
        return false;
    }
  }
}
