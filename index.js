import { bot } from './main/telegram/index.js';
import { START_ACTION_NAME } from './core/start/index.js';
import { saveMessageIdInSessionFromQueryHelper } from './main/telegram/index.js';

bot
  .command(START_ACTION_NAME, ctx => { 
    saveMessageIdInSessionFromQueryHelper(ctx);
    ctx.scene.enter(START_ACTION_NAME) 
  })
  .launch();