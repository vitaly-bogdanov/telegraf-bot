import { Scenes } from 'telegraf';

import { 
  saveMessageIdInSessionFromReplyHelper, 
  clearMessageIdListInSessionHelper 
} from '../../main/telegram/index.js';
import { TIME_ACTION_NAME, ACTION } from './time.constant.js';
import { timeService } from './time.service.js';
import { timeKeyboard } from './time.keyboard.js';

export const timeScene = new Scenes.BaseScene(TIME_ACTION_NAME)
  .enter(async ctx => {
    ctx.session.timeId = ctx.match.index;
    const time = await timeService.getTime(ctx.session.timeId);
    ctx.session.scheduleId = time.schedule.id;
    const text = `📢 ${time.schedule.dayName}\n\n😎 Менеджер: @${time.schedule.user.username}, ${time.schedule.user.telegramId}\n🕑 Диапазон времени: ${time.value}\n🗂 Категория: ${time.category ? time.category.description : 'пусто'}`;
    await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply(text, timeKeyboard));
  })
  .action(ACTION.SET_TIME, ctx => {
    ctx.match.index = ctx.session.timeId;
    ctx.scene.enter(ACTION.SET_TIME);
  })
  .action(ACTION.SET_CATEGORY, ctx => {

  })
  .action(ACTION.BACK, ctx => {
    ctx.match.index = ctx.session.scheduleId;
    ctx.scene.enter(ACTION.BACK);
  })
  .leave(ctx => {
    delete ctx.session.scheduleId;
    delete ctx.session.timeId;
    clearMessageIdListInSessionHelper(ctx);
  });