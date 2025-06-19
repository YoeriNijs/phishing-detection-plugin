import { ICommunity } from './_i-community';

class PhishingDatabaseCache {
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

  fetch(): Promise<string[]> {
    const cachedValue = PhishingDatabaseCache.getCache();
    if (cachedValue === null) {
      return fetch(this._feed_url)
        .then(res => res.text())
        .then(text => text.split('\n'))
        .then(value => {
          PhishingDatabaseCache.updateCache(value);
          return value;
        });
    } else {
      return Promise.resolve(PhishingDatabaseCache.getCache());
    }
  }
}
