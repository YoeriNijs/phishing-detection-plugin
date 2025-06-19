import { Openfish } from './_openfish';

export class CommunityLoader {
  private _communityUrls: string[] = [];

  async getCommunityUrls(): Promise<string[]> {
    const sources = [new Openfish()];
    const communitySources$ = sources.map(source =>
      source
        .fetch()
        .then(res => (this._communityUrls = [...this._communityUrls, ...res]))
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
