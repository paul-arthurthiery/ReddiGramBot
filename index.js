const Telegraf = require('telegraf')
require('dotenv').config();
const {getInterestingInfoFromUrl} = require('./redditService');

const bot = new Telegraf(process.env.BOT_TOKEN, {username: process.env.USERNAME})

bot.start((ctx) => ctx.reply('Welcome! Send me a reddit post url and I will give you some info about the post'))
bot.hears(/.reddit.com/, async (ctx) => {
  try {
    let reply = await getInterestingInfoFromUrl(ctx.message.text);
    if (reply.url) {
      ctx.replyWithPhoto(reply.url, {
        caption: reply.title,
        parse_mode: 'Markdown'
      });
    } else {
      ctx.reply(reply.title);
    }
  } catch (err) {
    let reply = 'Something went wrong while searching for the post';
    ctx.reply(reply);
  }

})
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))

bot.on('inline_query', async ({inlineQuery, answerInlineQuery}) => {
  const offset = parseInt(inlineQuery.offset) || 0
  try {
    const post = await getInterestingInfoFromUrl(inlineQuery.query, offset, 30)
    const results = [
      {
        type: "photo",
        id: post.id,
        title: post.title,
        photo_url: post.url,
        thumb_url: post.url
      }
    ]
    console.log(results);
    return answerInlineQuery(results, {
      next_offset: offset + 30
    })
  } catch (err) {
    console.log(err);
  }
})

bot.startPolling()
