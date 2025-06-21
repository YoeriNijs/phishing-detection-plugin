import { ICommunity } from './_i-community';

export class OpenFishCache {
  private static CACHED_FEED: string[] = null;

  private constructor() {
    // Do not instantiate
  }

  static updateCache(value: string[]): void {
    OpenFishCache.CACHED_FEED = value;
  }

  static getCache(): string[] | null {
    return OpenFishCache.CACHED_FEED;
  }
}

export class Openfish implements ICommunity {
  private readonly _feed_url =
    'https://raw.githubusercontent.com/openphish/public_feed/refs/heads/main/feed.txt';

  async fetch(): Promise<string[]> {
    const cachedValue = OpenFishCache.getCache();
    if (cachedValue === null) {
      try {
        const response = await fetch(this._feed_url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const text = await response.text();
        const value = text.split('\n').filter(link => link.trim() !== ''); // Filter out empty lines
        OpenFishCache.updateCache(value);
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
