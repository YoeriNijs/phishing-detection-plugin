import { StevenBlack, StevenBlackCache } from '../_steven_black';

const MOCKED_STEVEN_BLACK_BODY = `# Title: StevenBlack/hosts
#
# This hosts file is a merged collection of hosts from reputable sources,
# with a dash of crowd sourcing via GitHub
#
# Date: 08 November 2026 03:20:51 (UTC)
# Number of unique domains: 78,215
#
# Fetch the latest version of this file: https://raw.githubusercontent.com/StevenBlack/hosts/master/hosts
# Project home page: https://github.com/StevenBlack/hosts
# Project releases: https://github.com/StevenBlack/hosts/releases
#
# ===============================================================

127.0.0.1 localhost
127.0.0.1 localhost.localdomain
127.0.0.1 local
255.255.255.255 broadcasthost
::1 localhost
::1 ip6-localhost
::1 ip6-loopback
fe80::1%lo0 localhost
ff00::0 ip6-localnet
ff00::0 ip6-mcastprefix
ff02::1 ip6-allnodes
ff02::2 ip6-allrouters
ff02::3 ip6-allhosts
0.0.0.0 0.0.0.0
127.0.0.1 127.0.0.1
`;

describe('StevenBlack', () => {
  beforeEach(() => {
    // Clear the cache before each test
    StevenBlackCache.updateCache(null);
    // Reset the fetch mock before each test
    global.fetch = jest.fn();
  });

  it('should fetch data from the URL, update the cache when cache is empty and remove whitelisted domains', async () => {
    // Mock the fetch function
    const mockFetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        text: () => Promise.resolve(MOCKED_STEVEN_BLACK_BODY)
      })
    );

    // Replace the global fetch with the mock
    global.fetch = mockFetch;

    const stevenBlack = new StevenBlack();
    const result = await stevenBlack.fetch();

    const expectedResult = [
      'localhost.localdomain',
      'broadcasthost',
      'ip6-localhost',
      'ip6-loopback',
      'ip6-localnet',
      'ip6-mcastprefix',
      'ip6-allnodes',
      'ip6-allrouters',
      'ip6-allhosts'
    ];
    expect(mockFetch).toHaveBeenCalledWith(stevenBlack['_feed_url']);
    expect(result).toEqual(expectedResult);
    expect(StevenBlackCache.getCache()).toEqual(expectedResult);
  });

  it('should return cached data when cache is not empty', async () => {
    // Set up the cache with some data
    const cachedData = ['cachedLink1', 'cachedLink2'];
    StevenBlackCache.updateCache(cachedData);

    const stevenBlack = new StevenBlack();
    const result = await stevenBlack.fetch();

    expect(result).toEqual(cachedData);
    expect(global.fetch).not.toHaveBeenCalled(); // Ensure fetch was not called
  });
});
