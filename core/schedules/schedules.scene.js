import { Scenes } from 'telegraf';

import { SCHEDULES_ACTION_NAME } from './schedules.constant.js';
import { 
  saveMessageIdInSessionFromReplyHelper, 
  clearMessageIdListInSessionHelper 
} from '../../main/telegram/index.js';
import { schedulesService } from './schedules.service.js';
import { scheduleKeyboardGenerator } from './schedules.keyboard.js';
import { ACTION } from './schedules.constant.js';

export const shedulesScene = new Scenes.BaseScene(SCHEDULES_ACTION_NAME)
  .enter(async ctx => {
    const managerId = ctx.match.index;
    const manager = await schedulesService.getManager(managerId);
    const text = `ID: ${manager.telegramId}\nМенеджер: @${manager.username}\nВыберите день недели,\nкоторый хотите настроить:`;
    await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply(text, scheduleKeyboardGenerator(manager.schedules)));
  })
  .action(ACTION.BACK, ctx => {
    ctx.scene.enter(ACTION.BACK);
  })
  .action(new RegExp(`${ACTION.SCHEDULE}\/[0-9]+`), ctx => {
    ctx.match.index = +ctx.match[0].split('/')[1];
    ctx.scene.enter(ACTION.SCHEDULE);
  })
  .leave(ctx => {
    clearMessageIdListInSessionHelper(ctx);
  });