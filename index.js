const Telegraf = require('telegraf');
require('dotenv').config();
const { getParsedRedditPost, getInlineParsedRedditPost } = require('./redditService');

const bot = new Telegraf(process.env.BOT_TOKEN, { username: process.env.USERNAME });

// DOING:10 transfer stuff to api side
// TODO:20 add gif support 😎

bot.start(ctx => ctx.reply('Welcome! Send me a reddit post url and I will give you some info about the post'));
bot.hears(/.reddit.com/, async (ctx) => {
  try {
    console.log('got message');
    const reply = await getParsedRedditPost(ctx.message.text);
    console.log(reply);
    if (reply.media) {
      ctx.replyWithPhoto(reply.media, {
        caption: reply.caption,
        parse_mode: reply.parse_mode,
      });
    } else ctx.reply(reply);
  } catch (err) {
    const reply = 'Something went wrong while searching for the post';
    ctx.reply(reply);
  }
});
bot.on('sticker', ctx => ctx.reply('👍'));
bot.hears('hi', ctx => ctx.reply('Hey there'));

bot.on('inline_query', async ({ inlineQuery, answerInlineQuery }) => {
  if (inlineQuery) {
    console.log('got message');
    const offset = parseInt(inlineQuery.offset, 10) || 0;
    try {
      const results = await getInlineParsedRedditPost(inlineQuery.query);
      console.log(results);
      return answerInlineQuery(results, {
        next_offset: offset + 30,
      });
    } catch (err) {
      throw err;
    }
  } else return null;
});

bot.startPolling();
