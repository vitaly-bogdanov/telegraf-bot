import { Scenes } from 'telegraf';

import { SCHEDULE_ACTION_NAME, ACTION } from './schedule.constant.js';
import { scheduleService } from './schedule.service.js';
import { 
  saveMessageIdInSessionFromReplyHelper, 
  clearMessageIdListInSessionHelper 
} from '../../main/telegram/index.js';
import { scheduleKeyboardGenerator } from './schedule.keyboard.js';

export const sheduleScene = new Scenes.BaseScene(SCHEDULE_ACTION_NAME)
  .enter(async ctx => {
    const scheduleId = ctx.match.index;
    const schedule = await scheduleService.getSchedule(scheduleId);
    ctx.session.managerId = schedule.userId;
    const text = `📢 ${schedule.dayName}`;
    await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply(text, scheduleKeyboardGenerator(schedule.times)));
  })
  .action(ACTION.BACK, ctx => {
    ctx.match.index = ctx.session.managerId;
    delete ctx.session.managerId;
    ctx.scene.enter(ACTION.BACK);
  })
  .action(new RegExp(`${ACTION.TIME}\/[0-9]+`), ctx => {
    ctx.match.index = +ctx.match[0].split('/')[1];
    ctx.scene.enter(ACTION.TIME);
  })
  .leave(ctx => {
    clearMessageIdListInSessionHelper(ctx);
  });