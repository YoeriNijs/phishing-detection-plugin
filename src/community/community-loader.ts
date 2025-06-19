import { Openfish } from './_openfish';
import { PhishingDatabase } from './_phishing-database';
import { ICommunity } from './_i-community';

export class CommunityLoader {
  private readonly _sources: ICommunity[] = [
    new Openfish(),
    new PhishingDatabase()
  ];
  private _communityUrls: string[] = [];

  async getCommunityUrls(): Promise<string[]> {
    const communitySources$ = this._sources.map(source =>
      source
        .fetch()
        .then(res => {
          if (res && Array.isArray(res) && res.length > 0) {
            this._communityUrls = [...this._communityUrls, ...res];
          }
        })
        .catch(err => {
          throw Error(`Cannot fetch community data: ${err}`);
        })
    );
    return await Promise.all(communitySources$).then(() => {
      const uniqueCommunityUrls = new Set(this._communityUrls);
      return [...uniqueCommunityUrls];
    });
  }
}
