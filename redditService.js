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
  const newUrl = editUrl(url);
  return axios.get(newUrl).then((res) => {
    const redditJSON = res.data.data.children[0].data;
    const postObject = {
      id: redditJSON.id,
      title: redditJSON.title,
    };
    let mediaUrl = (redditJSON.media && redditJSON.media.reddit_video)
      ? redditJSON.media.reddit_video.fallback_url
      : redditJSON.url;
    if (mediaUrl.includes('gfycat') && !mediaUrl.includes('giant')) {
      mediaUrl = `https://giant.gfycat.com/${mediaUrl.match('[a-zA-Z]*$')[0]}.mp4`;
    } else if (mediaUrl.includes('imgur')) {
      mediaUrl = mediaUrl.replace('.gifv', '.mp4');
    }
    postObject.url = mediaUrl;
    postObject.thumb_url = redditJSON.thumbnail ? redditJSON.thumbnail : mediaUrl;

    if ((redditJSON.media && redditJSON.media.reddit_video && redditJSON.media.reddit_video.is_gif)
      || (redditJSON.media && redditJSON.media.oembed && redditJSON.media.oembed.type === 'video' && !redditJSON.media.is_video)
      || (postObject.url.slice(-4) === '.gif')) postObject.type = 'gif';
    else if (redditJSON.is_video || postObject.url.slice(-4) === '.mp4') postObject.type = 'video';
    else postObject.type = 'photo';

    return postObject;
  }).catch((err) => {
    throw (err);
  });
};
module.exports.getPostJson = getPostJson;

// return an object useable by telegraf's ctx wrapper (direct conversation version)
const getParsedRedditPost = async (url) => {
  const post = await getPostJson(url);
  if (post.url) {
    return ({
      id: post.id,
      media: post.url,
      caption: `[${post.title}](${url})`,
      parse_mode: 'Markdown',
      type: post.type,
    });
  }
  return (`[${post.title}](${url})`);
};
module.exports.getParsedRedditPost = getParsedRedditPost;


// return an object useable by telegraf's ctx wrapper (inline version)
const getInlineParsedRedditPost = async (url) => {
  const post = await getPostJson(url);
  const results = [{
    type: post.type,
    id: post.id,
    title: post.title,
    thumb_url: post.thumb_url,
    parse_mode: 'markdown',
    caption: `[${post.title}](${url})`,
  }];
  switch (post.type) {
    case 'gif':
      results[0].gif_url = post.url;
      break;
    case 'video':
      results[0].video_url = post.url;
      break;
    default:
      results[0].photo_url = post.url;
      break;
  }
  return results;
};
module.exports.getInlineParsedRedditPost = getInlineParsedRedditPost;
