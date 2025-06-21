import { ICommunity } from './_i-community';

export class PhishingDatabaseCache {
  private static CACHED_FEED: string[] = null;

  private constructor() {
    // Do not instantiate
  }

  static updateCache(value: string[]): void {
    PhishingDatabaseCache.CACHED_FEED = value;
  }

  static getCache(): string[] | null {
    return PhishingDatabaseCache.CACHED_FEED;
  }
}

export class PhishingDatabase implements ICommunity {
  private readonly _feed_url =
    'https://raw.githubusercontent.com/Phishing-Database/Phishing.Database/refs/heads/master/phishing-links-NEW-today.txt';

  async fetch(): Promise<string[]> {
    const cachedValue = PhishingDatabaseCache.getCache();
    if (cachedValue === null) {
      try {
        const response = await fetch(this._feed_url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const text = await response.text();
        const value = text.split('\n').filter(link => link.trim() !== ''); // Filter out empty lines
        PhishingDatabaseCache.updateCache(value);
        return value;
      } catch (error) {
        console.error('Fetch error:', error);
        throw error; // Rethrow the error for handling in the calling code
      }
    } else {
      return Promise.resolve(cachedValue);
    }
  }
}
