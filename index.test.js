const { editUrl, getPostJson, getPostTitle, getPostMediaUrl, getInterestingInfoFromUrl, getPostId } = require('./redditService');
const axios = require('axios');
//const MockAdapter = require('axios-mock-adapter');


//DONE:60 editUrl test
test('creates proper url', () => {
    expect(editUrl('https://ww.reddit.com/r/surrealmemes/comments/8yvazn/need_a_drinc_how_about_a_corc/')).toBe('https://www.reddit.com/by_id/t3_8yvazn.json')
    expect(editUrl('https://www.reddit.com/r/redditdev/comments/23cqir/how_to_get_json_data_for_the_post_only_not_the/')).toBe('https://www.reddit.com/by_id/t3_23cqir.json')
})

//DONE:80 getPostJson test
test('returns correct object', async () => {
    expect.assertions(1);

    const data = await getPostJson('https://www.reddit.com/by_id/t3_8yvazn.json');
    await expect(data).toMatchObject({selftext: "", title: "Need a drinc? How about a CORC™?", url: "https://i.redd.it/kjkl4sqihy911.png", score: expect.any(Number)});

} )

//DONE:40 getPostTitle test
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

//DONE:0 getInterestingInfoFromUrl test
test('gets object for telegraf', async () => {

    const interestingInfo = await getInterestingInfoFromUrl('https://ww.reddit.com/r/surrealmemes/comments/8yvazn/need_a_drinc_how_about_a_corc/');
    expect(interestingInfo).toEqual({id:"t3_8yvazn", title: "Need a drinc? How about a CORC™?", url: "https://i.redd.it/kjkl4sqihy911.png"});
})

//TODO: add post hyperlink test
