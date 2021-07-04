import { bot } from './main/telegram/index.js';
import { START_ACTION_NAME } from './core/start/index.js';

bot
  .command(START_ACTION_NAME, (ctx) => ctx.scene.enter(START_ACTION_NAME))
  .launch();