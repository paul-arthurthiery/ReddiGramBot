var axios = require('axios');

//DONE:50 editUrl
//get the proper url for reddit post's json object
const editUrl = (url) => {

  try {
    if (url.match('(?:[^\/]*(?:\/)){6}([^\/]+)')[1]) {
      let originalUrl = url.match('(?:[^\/]*(?:\/)){6}([^\/]+)')[1];
      newUrl = 'https://www.reddit.com/by_id/t3_' + originalUrl + '.json';
      return newUrl;
    }
  } catch (err) {
    throw err;
  }

}

module.exports.editUrl = editUrl;

//DONE:90 getPostJson
//call the url and parse the useful json data
const getPostJson = (url) => {
  let postObject = {
    "selftext": null,
    "title": null,
    "url": null,
    "score": null
  }

  return axios.get(url).then((res) => {
    let actualStuff = res.data.data.children[0].data;
    postObject = {
      "name": actualStuff.name,
      "selftext": actualStuff.selftext,
      "title": actualStuff.title,
      "url": actualStuff.url,
      "score": actualStuff.score
    };
    return postObject;
  }).catch((err) => {
    throw(err);
  })

}

module.exports.getPostJson = getPostJson;

// DONE:40 getPostTitle
//return the post's title
const getPostTitle = (postObject) => {
  let title = postObject.title;
  return title;
}

module.exports.getPostTitle = getPostTitle;

// DONE:70 add media support
// get media url in order to display media
const getPostMediaUrl = (postObject) => {
  let mediaUrl = postObject.url;
  return mediaUrl;
}

module.exports.getPostMediaUrl = getPostMediaUrl;

//parse postId from url in order to respect Telegram's bot API
const getPostId = (postObject) => {
  let id = postObject.name;
  return id;
}

module.exports.getPostId = getPostId;

// DONE:30 getInterestingInfoFromUrl
// store all post "Interesting info" as a single object. this should grow as I discover what to do with all the info and I want to display more stuff
const getInterestingInfoFromUrl = async (url) => {
  let newUrl = editUrl(url);
  let postJson = await getPostJson(newUrl);

  return {"id": getPostId(postJson), "title": getPostTitle(postJson), "url": getPostMediaUrl(postJson)}

}

module.exports.getInterestingInfoFromUrl = getInterestingInfoFromUrl;
