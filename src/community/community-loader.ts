import { OpenPhish } from './_openphish';
import { PhishingDatabase } from './_phishing-database';
import { ICommunity } from './_i-community';
import { StevenBlack } from './_steven_black';

export class CommunityLoader {
  private readonly _sources: ICommunity[] = [
    new OpenPhish(),
    new PhishingDatabase(),
    new StevenBlack()
  ];

  async getCommunityUrls(): Promise<string[]> {
    // One unreachable community source should not prevent the other source
    // from being used. Promise.allSettled keeps the plugin usable when a feed
    // is temporarily offline.
    const results = await Promise.allSettled(
      this._sources.map(source =>
        source
          .fetch()
          .then(res => {
            console.log(`Loaded community source: ${source.publicName()}`);
            return res;
          })
          .catch(() =>
            console.error(
              `Failed to load community source: ${source.publicName()}`
            )
          )
      )
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
