import { bot } from './main/telegram/index.js';
import { START_ACTION_NAME } from './core/start/index.js';
import { saveMessageIdMessageIdInSessionFromQueryHelper } from './main/telegram/index.js';

bot
  .command(START_ACTION_NAME, ctx => { 
    saveMessageIdMessageIdInSessionFromQueryHelper(ctx);
    ctx.scene.enter(START_ACTION_NAME) 
  })
  .launch();