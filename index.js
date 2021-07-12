import { bot } from './main/telegram/index.js';
import { START_ACTION_NAME } from './core/start/index.js';
import { saveMessageIdInSessionFromQueryHelper } from './main/telegram/index.js';
import { startSchedule } from './main/scheduler/index.js';

import { testSchedule } from './schedule.js';

const start = () => {
  try {
    bot.command(START_ACTION_NAME, ctx => { 
      saveMessageIdInSessionFromQueryHelper(ctx);
      ctx.scene.enter(START_ACTION_NAME) 
    }).launch();
    startSchedule();
  } catch (e) {
    setTimeout(() => start(), 20000);
  }
};

// setTimeout(() => {
//   console.log('test start');
//   testSchedule();
// }, 40000);

start();