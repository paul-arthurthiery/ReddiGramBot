const redditPayload8yvazn = {
  "data": {
    "kind": "Listing",
    "data": {
      "modhash": "ohe5s9oqz03c05285d2236017c79de49235da953e5e827ee5f",
      "dist": 1,
      "children": [
        {
          "kind": "t3",
          "data": {
            "approved_at_utc": null,
            "subreddit": "surrealmemes",
            "selftext": "",
            "user_reports": [],
            "saved": false,
            "mod_reason_title": null,
            "gilded": 0,
            "clicked": false,
            "title": "Need a drinc? How about a CORC™?",
            "link_flair_richtext": [],
            "subreddit_name_prefixed": "r/surrealmemes",
            "hidden": false,
            "pwls": 6,
            "link_flair_css_class": null,
            "downs": 0,
            "thumbnail_height": 140,
            "parent_whitelist_status": "all_ads",
            "hide_score": false,
            "name": "t3_8yvazn",
            "quarantine": false,
            "link_flair_text_color": "dark",
            "author_flair_background_color": null,
            "subreddit_type": "restricted",
            "ups": 9821,
            "domain": "i.redd.it",
            "media_embed": {},
            "thumbnail_width": 140,
            "author_flair_template_id": null,
            "is_original_content": false,
            "secure_media": null,
            "is_reddit_media_domain": true,
            "category": null,
            "secure_media_embed": {},
            "link_flair_text": null,
            "can_mod_post": false,
            "score": 9821,
            "approved_by": null,
            "thumbnail": "default",
            "edited": false,
            "author_flair_css_class": null,
            "author_flair_richtext": [],
            "content_categories": null,
            "is_self": false,
            "mod_note": null,
            "created": 1531621445.0,
            "link_flair_type": "text",
            "wls": 6,
            "author_id": "t2_chtkd",
            "post_categories": null,
            "banned_by": null,
            "author_flair_type": "text",
            "contest_mode": false,
            "selftext_html": null,
            "likes": null,
            "suggested_sort": null,
            "banned_at_utc": null,
            "view_count": null,
            "archived": false,
            "no_follow": false,
            "is_crosspostable": false,
            "pinned": false,
            "over_18": false,
            "media_only": false,
            "can_gild": true,
            "spoiler": false,
            "locked": false,
            "author_flair_text": null,
            "rte_mode": "markdown",
            "visited": false,
            "num_reports": null,
            "distinguished": null,
            "subreddit_id": "t5_3bz2s",
            "mod_reason_by": null,
            "removal_reason": null,
            "id": "8yvazn",
            "report_reasons": null,
            "author": "Aleksander_Rosa",
            "num_crossposts": 3,
            "num_comments": 112,
            "send_replies": true,
            "mod_reports": [],
            "author_flair_text_color": null,
            "permalink": "/r/surrealmemes/comments/8yvazn/need_a_drinc_how_about_a_corc/",
            "whitelist_status": "all_ads",
            "stickied": false,
            "url": "https://i.redd.it/kjkl4sqihy911.png",
            "subreddit_subscribers": 345418,
            "created_utc": 1531592645.0,
            "media": null,
            "is_video": false
          }
        }
      ],
      "after": null,
      "before": null
    }
  }
};

module.exports = {
  get: jest.fn((url) => {
    return Promise.resolve(redditPayload8yvazn);
  }),
  create: jest.fn(function() {
    return this;
  })
}
