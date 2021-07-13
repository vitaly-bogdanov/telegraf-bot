import { Scenes } from 'telegraf';

import { TIME_SET_DIAPASONE, ACTION } from './timeSetDiapasone.constant.js';
import { 
  saveMessageIdInSessionFromReplyHelper,
  clearMessageIdListInSessionHelper,
  saveMessageIdInSessionFromQueryHelper 
} from '../../main/telegram/index.js';
import { timeSetDiapasoneKeyboard } from './timeSetDiapasone.keyboard.js';
import { timeSetDiapasoneService } from './timeSetDiapasone.service.js';
import { diapasoneValidate } from './timeSetDiapasone.validate.js';

export const timeSetDiapasoneScene = new Scenes.BaseScene(TIME_SET_DIAPASONE)
  .enter(async ctx => {
    ctx.session.timeId = ctx.match.index;
    const time = await timeSetDiapasoneService.getTime(ctx.session.timeId);
    const text = `🕑 ${time.value}\nВведите новое время:`;
    await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply(text, timeSetDiapasoneKeyboard));
  })
  .on('text', async ctx => {
    saveMessageIdInSessionFromQueryHelper(ctx);
    const timeValue = ctx.message.text;
    if (diapasoneValidate(timeValue)) {
      await timeSetDiapasoneService.setDiapsone(ctx.session.timeId, timeValue);
      await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply('✅ Готово!'));
      ctx.match = {};
      ctx.match.index = ctx.session.timeId;
      setTimeout(() => ctx.scene.enter(ACTION.BACK), 1500);
    } else {
      ctx.match = {};
      ctx.match.index = ctx.session.timeId;
      await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply('⛔️ Временной диапазон введен не корректно!'));
      setTimeout(() => ctx.scene.reenter(), 500);
    }
  })
  .action(ACTION.BACK, ctx => { 
    ctx.match.index = ctx.session.timeId;
    ctx.scene.enter(ACTION.BACK);
  })
  .leave(ctx => {
    delete ctx.session.timeId;
    clearMessageIdListInSessionHelper(ctx);
  });