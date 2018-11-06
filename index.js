const Telegraf = require('telegraf');
const winston = require('winston');
require('dotenv').config();
const {
  getParsedRedditPost,
  getInlineParsedRedditPost,
} = require('./redditService');


const bot = new Telegraf(process.env.BOT_TOKEN, {
  username: process.env.USERNAME,
});


const logger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      filename: 'error.log',
    }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

// TODO:20 add gif support 😎
bot.start(ctx => ctx.reply('Welcome! Send me a reddit post url and I will reply with a parsed version'));
bot.hears(/.reddit.com/, async (ctx) => {
  try {
    const reply = await getParsedRedditPost(ctx.message.text);
    if (reply.media) {
      const parameters = {
        caption: reply.caption,
        parse_mode: reply.parse_mode,
      };
      if (reply.type === 'photo') ctx.replyWithPhoto(reply.media, parameters);
      else if (reply.type === 'gif') {
        if (reply.media.includes('gfycat')) ctx.reply('Sorry bro, gfycat links don\'t work right now, go bother @salucpat so he fixes it');
        ctx.replyWithAnimation(reply.media, parameters);
      } else ctx.replyWithVideo(reply.media, parameters);
    } else ctx.reply(reply);
  } catch (err) {
    if (err.response && err.response.statusCode === 403) {
      logger.error(`Someone blocked this bot at ${ctx.message.text}`);
    } else {
      const reply = 'Something went wrong while searching for the post';
      ctx.reply(reply);
    }
  }
});
bot.on('sticker', ctx => ctx.reply('👍'));
bot.hears('hi', ctx => ctx.reply('Hey there'));

bot.on('inline_query', async ({
  inlineQuery,
  answerInlineQuery,
}) => {
  if (inlineQuery) {
    const offset = parseInt(inlineQuery.offset, 10) || 0;
    try {
      const results = await getInlineParsedRedditPost(inlineQuery.query);
      return answerInlineQuery(results, {
        next_offset: offset + 30,
      });
    } catch (err) {
      logger.error(err);
      return false;
    }
  } else return null;
});

bot.startPolling();
