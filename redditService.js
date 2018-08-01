var axios = require('axios');

//DONE: editUrl id:5
//get the proper url for reddit post's json object
const editUrl = (url) => {

  if (url.match('(?:[^\/]*(?:\/)){6}([^\/]+)')[1]) {
    let originalUrl = url.match('(?:[^\/]*(?:\/)){6}([^\/]+)')[1];
    newUrl = 'https://www.reddit.com/by_id/t3_' + originalUrl + '.json'
  } else
    throw 'Incorrect Url';
  return newUrl;
}

module.exports.editUrl = editUrl;

//DONE: getPostJson id:2
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

// DONE: getPostTitle id:8
//return the post's title
const getPostTitle = (postObject) => {
  let title = postObject.title;
  return title;
}

module.exports.getPostTitle = getPostTitle;

// DOING: add media support id:11
const getPostMediaUrl = (postObject) => {
  let mediaUrl = postObject.url;
  return mediaUrl;
}

module.exports.getPostMediaUrl = getPostMediaUrl;

const getPostId = (postObject) => {
  let id = postObject.name;
  return id;
}

module.exports.getPostId = getPostId;

// DONE: getInterestingInfoFromUrl id:14
const getInterestingInfoFromUrl = async (url) => {
  let newUrl = editUrl(url);
  let postJson = await getPostJson(newUrl);

  return {"id": getPostId(postJson), "title": getPostTitle(postJson), "url": getPostMediaUrl(postJson)}

}

module.exports.getInterestingInfoFromUrl = getInterestingInfoFromUrl;
