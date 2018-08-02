const axios = require('axios');
const {
  editUrl, getPostJson, getPostTitle, getPostMediaUrl, getInterestingInfoFromUrl, getPostId,
  getParsedRedditPost, getInlineParsedRedditPost,
} = require('./redditService');

// DOING:0 more test after transfer of functions to api side

test('creates proper url', () => {
  expect(editUrl('https://ww.reddit.com/r/surrealmemes/comments/8yvazn/need_a_drinc_how_about_a_corc/')).toBe('https://www.reddit.com/by_id/t3_8yvazn.json');
  expect(editUrl('https://www.reddit.com/r/redditdev/comments/23cqir/how_to_get_json_data_for_the_post_only_not_the/')).toBe('https://www.reddit.com/by_id/t3_23cqir.json');
});

test('returns correct object', async () => {
  expect.assertions(1);

  const data = await getPostJson('https://www.reddit.com/by_id/t3_8yvazn.json');
  await expect(data).toMatchObject({
    selftext: '', title: 'Need a drinc? How about a CORC™?', url: 'https://i.redd.it/kjkl4sqihy911.png', score: expect.any(Number),
  });
});

test('gets proper title', async () => {
  const data = await getPostJson('https://www.reddit.com/by_id/t3_8yvazn.json');
  expect(getPostTitle(data)).toBe('Need a drinc? How about a CORC™?');
});

test('gets proper media url', async () => {
  const data = await getPostJson('https://www.reddit.com/by_id/t3_8yvazn.json');
  expect(getPostMediaUrl(data)).toBe('https://i.redd.it/kjkl4sqihy911.png');
});

test('gets proper id', async () => {
  const data = await getPostJson('https://www.reddit.com/by_id/t3_8yvazn.json');
  expect(getPostId(data)).toBe('8yvazn');
});

test('gets object for telegraf', async () => {
  const interestingInfo = await getInterestingInfoFromUrl('https://ww.reddit.com/r/surrealmemes/comments/8yvazn/need_a_drinc_how_about_a_corc/');
  expect(interestingInfo).toEqual({ id: '8yvazn', title: 'Need a drinc? How about a CORC™?', url: 'https://i.redd.it/kjkl4sqihy911.png' });
});

test('proper reply fed to telegraf for direct media link', async () => {
  const reply = await getParsedRedditPost('https://ww.reddit.com/r/surrealmemes/comments/8yvazn/need_a_drinc_how_about_a_corc/');
  expect(reply).toEqual({ media: 'https://i.redd.it/kjkl4sqihy911.png', caption: '[Need a drinc? How about a CORC™?](https://ww.reddit.com/r/surrealmemes/comments/8yvazn/need_a_drinc_how_about_a_corc/)', parse_mode: 'Markdown' });
});

test('proper reply fed to telegraf for inline media link', async () => {
  const reply = await getInlineParsedRedditPost('https://ww.reddit.com/r/surrealmemes/comments/8yvazn/need_a_drinc_how_about_a_corc/');
  expect(reply).toEqual([
    {
      type: 'photo',
      id: '8yvazn',
      title: 'Need a drinc? How about a CORC™?',
      photo_url: 'https://i.redd.it/kjkl4sqihy911.png',
      thumb_url: 'https://i.redd.it/kjkl4sqihy911.png',
      parse_mode: 'markdown',
      caption: '[Need a drinc? How about a CORC™?](https://ww.reddit.com/r/surrealmemes/comments/8yvazn/need_a_drinc_how_about_a_corc/)',
    },
  ]);
});
