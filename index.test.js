const { editUrl, getPostJson, getPostTitle, getPostMediaUrl, getInterestingInfoFromUrl, getPostId } = require('./redditService');
const axios = require('axios');
//const MockAdapter = require('axios-mock-adapter');


//DONE: editUrl test id:1
test('creates proper url', () => {
    expect(editUrl('https://ww.reddit.com/r/surrealmemes/comments/8yvazn/need_a_drinc_how_about_a_corc/')).toBe('https://www.reddit.com/by_id/t3_8yvazn.json')
    expect(editUrl('https://www.reddit.com/r/redditdev/comments/23cqir/how_to_get_json_data_for_the_post_only_not_the/')).toBe('https://www.reddit.com/by_id/t3_23cqir.json')
})

//DONE: getPostJson test id:7
test('returns correct object', async () => {
    expect.assertions(1);

    const data = await getPostJson('https://www.reddit.com/by_id/t3_8yvazn.json');
    await expect(data).toMatchObject({selftext: "", title: "Need a drinc? How about a CORC™?", url: "https://i.redd.it/kjkl4sqihy911.png", score: expect.any(Number)});

} )

//DONE: getPostTitle test id:10
test('gets proper title', async () => {

    const data = await getPostJson('https://www.reddit.com/by_id/t3_8yvazn.json');
    expect(getPostTitle(data)).toBe("Need a drinc? How about a CORC™?");
})

test('gets proper media url', async () => {

    const data = await getPostJson('https://www.reddit.com/by_id/t3_8yvazn.json');
    expect(getPostMediaUrl(data)).toBe("https://i.redd.it/kjkl4sqihy911.png");
})

test('gets proper id', async () => {

    const data = await getPostJson('https://www.reddit.com/by_id/t3_8yvazn.json');
    expect(getPostId(data)).toBe("t3_8yvazn");
})

//DONE: getInterestingInfoFromUrl test id:13
test('gets object for telegraf', async () => {

    const interestingInfo = await getInterestingInfoFromUrl('https://ww.reddit.com/r/surrealmemes/comments/8yvazn/need_a_drinc_how_about_a_corc/');
    expect(interestingInfo).toEqual({id:"t3_8yvazn", title: "Need a drinc? How about a CORC™?", url: "https://i.redd.it/kjkl4sqihy911.png"});
})
