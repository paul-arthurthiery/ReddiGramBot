var axios = require('axios');


//DONE:30 editUrl
//get the proper url for reddit post's json object
const editUrl = (url) => {

    var newUrl = url.match('(?:[^\/]*(?:\/)){6}([^\/]+)')[1];
    if(newUrl) newUrl = 'https://www.reddit.com/by_id/t3_'+newUrl+'.json'
    else throw 'Incorrect Url';
    return newUrl;
}

module.exports.editUrl = editUrl;

//DONE:60 getPostJson
//call the url and parse the useful json data
const getPostJson = (url) => {
    let postObject = {"selftext": null, "title": null, "url": null, "score": null}

    return axios.get(url)
    .then((res) => {
        let actualStuff = res.data.data.children[0].data;
        postObject = {"selftext": actualStuff.selftext, "title": actualStuff.title, "url": actualStuff.url, "score": actualStuff.score };
        return postObject;
    })
    .catch((err) => {
        throw (err);
    })

}

module.exports.getPostJson = getPostJson;

// DONE:20 getPostTitle
//return the post's title
const getPostTitle = (postObject) => {
    let title = postObject.title;
    return title;
}

module.exports.getPostTitle = getPostTitle;

// DOING:0 add media support
const getPostMediaUrl = (postObject) => {
    let mediaUrl = postObject.url;
    return mediaUrl;
}

module.exports.getPostMediaUrl = getPostMediaUrl;


// DONE:10 getInterestingInfoFromUrl
const getInterestingInfoFromUrl = async(url) => {
    let newUrl = editUrl(url);
    let postJson = await getPostJson(newUrl);
    
    return {"title": getPostTitle(postJson), "url": getPostMediaUrl(postJson)}

}

module.exports.getInterestingInfoFromUrl = getInterestingInfoFromUrl;
