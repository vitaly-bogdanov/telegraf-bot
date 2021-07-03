import { bot } from './main/telegram/index.js';

bot.command('start', (ctx) => ctx.scene.enter('start'));
bot.command('menu', (ctx) => ctx.scene.enter('menu'));
bot.command('categories', (ctx) => ctx.enter('categories'));
bot.launch();