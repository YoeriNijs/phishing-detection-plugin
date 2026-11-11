import { Openfish } from './_openfish';
import { PhishingDatabase } from './_phishing-database';
import { ICommunity } from './_i-community';

export class CommunityLoader {
  private readonly _sources: ICommunity[] = [
    new Openfish(),
    new PhishingDatabase()
  ];

  async getCommunityUrls(): Promise<string[]> {
    // One unreachable community source should not prevent the other source
    // from being used. Promise.allSettled keeps the plugin usable when a feed
    // is temporarily offline.
    const results = await Promise.allSettled(
      this._sources.map(source => source.fetch())
    );

    const communityUrls = results.flatMap(result => {
      if (result.status === 'fulfilled' && Array.isArray(result.value)) {
        return result.value;
      }
      if (result.status === 'rejected') {
        console.error('Cannot fetch community data', result.reason);
      }
      return [];
    });

    return [...new Set(communityUrls)];
  }
}
