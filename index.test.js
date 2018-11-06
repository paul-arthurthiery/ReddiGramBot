/* global test expect */
/* eslint-disable-next-line */
const axios = require('./__mocks__/axios');
const {
  editUrl,
  getPostJson,
  getParsedRedditPost,
  getInlineParsedRedditPost,
} = require('./redditService');

// DOING:0 more test after transfer of functions to api side

test('creates proper url', () => {
  expect(editUrl('https://ww.reddit.com/r/surrealmemes/comments/8yvazn/need_a_drinc_how_about_a_corc/')).toBe('https://www.reddit.com/by_id/t3_8yvazn.json');
  expect(editUrl('https://www.reddit.com/r/redditdev/comments/23cqir/how_to_get_json_data_for_the_post_only_not_the/')).toBe('https://www.reddit.com/by_id/t3_23cqir.json');
});

test('returns correct object', async () => {
  expect.assertions(3);

  const data8yvazn = await getPostJson('https://www.reddit.com/r/surrealmemes/comments/8yvazn/need_a_drinc_how_about_a_corc/');
  const data94bmhv = await getPostJson('https://www.reddit.com/r/aww/comments/94bmhv/wholesomeness/');
  const data9987a2z = await getPostJson('https://www.reddit.com/r/AnimalsBeingJerks/comments/987a2z/my_birds_are_jerks/');
  await expect(data8yvazn).toMatchObject({
    id: '8yvazn',
    type: 'photo',
    title: 'Need a drinc? How about a CORC™?',
    url: 'https://i.redd.it/kjkl4sqihy911.png',
    thumb_url: 'https://i.redd.it/kjkl4sqihy911.png',
  });
  await expect(data94bmhv).toMatchObject({
    id: '94bmhv',
    type: 'gif',
    title: 'Wholesomeness',
    url: 'https://v.redd.it/4jsggvlwywd11/DASH_2_4_M',
    thumb_url: 'https://b.thumbs.redditmedia.com/zedlYO_qe5-j_w99bsBudOucDVh-1M2xG46TMUBRjVU.jpg',
  });
  await expect(data9987a2z).toMatchObject({
    id: '987a2z',
    type: 'video',
    title: 'My birds are jerks',
    url: 'https://v.redd.it/4rsr8kkzrqg11/DASH_9_6_M',
    thumb_url: 'https://b.thumbs.redditmedia.com/Dw4A5l1l9xuDs_WAqMyC9Zv-Wy9WO93ZyhRsNzuPkgM.jpg',
  });
});

test('proper reply fed to telegraf for direct media link', async () => {
  expect.assertions(3);
  const reply8yvazn = await getParsedRedditPost('https://www.reddit.com/r/surrealmemes/comments/8yvazn/need_a_drinc_how_about_a_corc/');
  const reply94bmhv = await getParsedRedditPost('https://www.reddit.com/r/aww/comments/94bmhv/wholesomeness/');
  const reply9987a2z = await getParsedRedditPost('https://www.reddit.com/r/AnimalsBeingJerks/comments/987a2z/my_birds_are_jerks/');
  expect(reply8yvazn).toEqual({
    id: '8yvazn',
    type: 'photo',
    media: 'https://i.redd.it/kjkl4sqihy911.png',
    caption: '[Need a drinc? How about a CORC™?](https://www.reddit.com/r/surrealmemes/comments/8yvazn/need_a_drinc_how_about_a_corc/)',
    parse_mode: 'Markdown',
  });
  expect(reply94bmhv).toEqual({
    id: '94bmhv',
    type: 'gif',
    media: 'https://v.redd.it/4jsggvlwywd11/DASH_2_4_M',
    caption: '[Wholesomeness](https://www.reddit.com/r/aww/comments/94bmhv/wholesomeness/)',
    parse_mode: 'Markdown',
  });
  expect(reply9987a2z).toEqual({
    id: '987a2z',
    type: 'video',
    media: 'https://v.redd.it/4rsr8kkzrqg11/DASH_9_6_M',
    caption: '[My birds are jerks](https://www.reddit.com/r/AnimalsBeingJerks/comments/987a2z/my_birds_are_jerks/)',
    parse_mode: 'Markdown',
  });
});

test('proper reply fed to telegraf for inline media link', async () => {
  expect.assertions(3);
  const reply8yvazn = await getInlineParsedRedditPost('https://www.reddit.com/r/surrealmemes/comments/8yvazn/need_a_drinc_how_about_a_corc/');
  const reply94bmhv = await getInlineParsedRedditPost('https://www.reddit.com/r/aww/comments/94bmhv/wholesomeness/');
  const reply9987a2z = await getInlineParsedRedditPost('https://www.reddit.com/r/AnimalsBeingJerks/comments/987a2z/my_birds_are_jerks/');
  expect(reply8yvazn).toEqual([{
    type: 'photo',
    id: '8yvazn',
    title: 'Need a drinc? How about a CORC™?',
    photo_url: 'https://i.redd.it/kjkl4sqihy911.png',
    thumb_url: 'https://i.redd.it/kjkl4sqihy911.png',
    parse_mode: 'markdown',
    caption: '[Need a drinc? How about a CORC™?](https://www.reddit.com/r/surrealmemes/comments/8yvazn/need_a_drinc_how_about_a_corc/)',
  }]);
  expect(reply94bmhv).toEqual([{
    type: 'gif',
    id: '94bmhv',
    title: 'Wholesomeness',
    gif_url: 'https://v.redd.it/4jsggvlwywd11/DASH_2_4_M',
    thumb_url: 'https://b.thumbs.redditmedia.com/zedlYO_qe5-j_w99bsBudOucDVh-1M2xG46TMUBRjVU.jpg',
    parse_mode: 'markdown',
    caption: '[Wholesomeness](https://www.reddit.com/r/aww/comments/94bmhv/wholesomeness/)',
  }]);
  expect(reply9987a2z).toEqual([{
    type: 'video',
    id: '987a2z',
    title: 'My birds are jerks',
    video_url: 'https://v.redd.it/4rsr8kkzrqg11/DASH_9_6_M',
    thumb_url: 'https://b.thumbs.redditmedia.com/Dw4A5l1l9xuDs_WAqMyC9Zv-Wy9WO93ZyhRsNzuPkgM.jpg',
    parse_mode: 'markdown',
    caption: '[My birds are jerks](https://www.reddit.com/r/AnimalsBeingJerks/comments/987a2z/my_birds_are_jerks/)',
  }]);
});
