/* global jest */

const redditPayload8yvazn = {
  data: {
    data: {
      children: [{
        data: {
          title: 'Need a drinc? How about a CORC™?',
          id: '8yvazn',
          url: 'https://i.redd.it/kjkl4sqihy911.png',
          created_utc: 1531592645.0,
          media: null,
          is_video: false,
        },
      }],
    },
  },
};

const redditPayload94bmhv = {
  data: {
    data: {
      children: [{
        data: {
          title: 'Wholesomeness',
          id: '94bmhv',
          url: 'https://v.redd.it/4jsggvlwywd11',
          created_utc: 1533317608.0,
          media: {
            reddit_video: {
              fallback_url: 'https://v.redd.it/4jsggvlwywd11/DASH_2_4_M',
              scrubber_media_url: 'https://v.redd.it/4jsggvlwywd11/DASH_600_K',
              is_gif: true,
            },
          },
          is_video: true,
          thumbnail: 'https://b.thumbs.redditmedia.com/zedlYO_qe5-j_w99bsBudOucDVh-1M2xG46TMUBRjVU.jpg',
        },
      }],
    },
  },
};

const redditPayload987a2z = {
  data: {
    data: {
      children: [{
        data: {
          title: 'My birds are jerks',
          id: '987a2z',
          url: 'https://v.redd.it/4rsr8kkzrqg11',
          created_utc: 534550194.0,
          media: {
            reddit_video: {
              fallback_url: 'https://v.redd.it/4rsr8kkzrqg11/DASH_9_6_M',
              scrubber_media_url: 'https://v.redd.it/4rsr8kkzrqg11/DASH_600_K',
              is_gif: false,
            },
          },
          is_video: true,
          thumbnail: 'https://b.thumbs.redditmedia.com/Dw4A5l1l9xuDs_WAqMyC9Zv-Wy9WO93ZyhRsNzuPkgM.jpg',
        },
      }],
    },
  },
};

module.exports = {
  get: jest.fn((url) => {
    if (url === 'https://www.reddit.com/by_id/t3_94bmhv.json') {
      return Promise.resolve(redditPayload94bmhv);
    }
    if (url === 'https://www.reddit.com/by_id/t3_987a2z.json') {
      return Promise.resolve(redditPayload987a2z);
    }
    return Promise.resolve(redditPayload8yvazn);
  }),
  create: jest.fn(() => this),
};
