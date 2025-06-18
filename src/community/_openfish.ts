import { ICommunity } from './_i-community';

class OpenFishCache {
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

  fetch(): Promise<string[]> {
    const cachedValue = OpenFishCache.getCache();
    if (cachedValue === null) {
      return fetch(this._feed_url)
        .then(res => res.text())
        .then(text => text.split('\n'))
        .then(value => {
          OpenFishCache.updateCache(value);
          return value;
        });
    } else {
      return Promise.resolve(OpenFishCache.getCache());
    }
  }
}
