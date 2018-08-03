const axios = require('axios');

// get the proper url for reddit post's json object
const editUrl = (url) => {
  try {
    // const originalUrl = url.match('(?:[^\/]*(?:\/)){6}([^\/]+)')[1];
    const originalUrl = url.match('(?:[^/]*(?:/)){6}([^/]+)')[1];
    const newUrl = `https://www.reddit.com/by_id/t3_${originalUrl}.json`;
    return newUrl;
  } catch (err) {
    throw err;
  }
};
module.exports.editUrl = editUrl;

// call the url and parse the useful json data
const getPostJson = (url) => {
  let postObject = {
    selftext: null,
    title: null,
    url: null,
    score: null,
  };

  return axios.get(url).then((res) => {
    const actualStuff = res.data.data.children[0].data;
    postObject = {
      id: actualStuff.id,
      selftext: actualStuff.selftext,
      title: actualStuff.title,
      url: actualStuff.url,
      score: actualStuff.score,
    };
    return postObject;
  }).catch((err) => {
    throw (err);
  });
};
module.exports.getPostJson = getPostJson;

// return the post's title
const getPostTitle = (postObject) => {
  if (postObject.title.length > 103) {
    return `${postObject.title.slice(0, 100)}...`;
  }
  return postObject.title;
};
module.exports.getPostTitle = getPostTitle;

// get media url in order to display media
const getPostMediaUrl = postObject => postObject.url;
module.exports.getPostMediaUrl = getPostMediaUrl;

// parse postId from url in order to respect Telegram's bot API
const getPostId = postObject => postObject.id;
module.exports.getPostId = getPostId;

// store all post "Interesting info" as a single object.
// this should grow as I discover what to do with all the info and I want to display more stuff
const getInterestingInfoFromUrl = async (url) => {
  const newUrl = editUrl(url);
  const postJson = await getPostJson(newUrl);

  return { id: getPostId(postJson), title: getPostTitle(postJson), url: getPostMediaUrl(postJson) };
};
module.exports.getInterestingInfoFromUrl = getInterestingInfoFromUrl;

// return an object useable by telegraf's ctx wrapper (direct conversation version)
const getParsedRedditPost = async (url) => {
  const post = await getInterestingInfoFromUrl(url);
  if (post.url) {
    return ({
      media: post.url,
      caption: `[${post.title}](${url})`,
      parse_mode: 'Markdown',
    });
  }
  return (`[${post.title}](${url})`);
};
module.exports.getParsedRedditPost = getParsedRedditPost;

const getInlineParsedRedditPost = async (url) => {
  const post = await getInterestingInfoFromUrl(url);
  const results = [
    {
      type: 'photo',
      id: post.id,
      title: post.title,
      photo_url: post.url,
      thumb_url: post.url,
      parse_mode: 'markdown',
      caption: `[${post.title}](${url})`,
    },
  ];
  return results;
};
module.exports.getInlineParsedRedditPost = getInlineParsedRedditPost;
