import { Telegraf, session } from 'telegraf';
import dotenv from 'dotenv';

import { stage } from './telegram.stage.js';

import { initSessionMiddleware } from './telegram.middlewares.js'

dotenv.config();

export const bot = new Telegraf(process.env.BOT_TOKEN);

// middlewares
bot.use(session());
bot.use(stage.middleware());

bot.on('message', initSessionMiddleware);