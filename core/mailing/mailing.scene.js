import { Scenes } from 'telegraf';

import { mailingKeyboard, mailingManagerKeyboardGenerator } from './mailing.keyboard.js';
import { MAILING_ACTION_NAME, ACTION } from './mailing.constant.js';
import { sleepHelper, SLEEP_MS } from '../../lib/telegram/index.js';
import { mailingService } from './mailing.service.js';
import { 
  saveMessageIdInSessionFromReplyHelper, 
  clearMessageIdListInSessionHelper 
} from '../../main/telegram/index.js';

export const mailingScene = new Scenes.BaseScene(MAILING_ACTION_NAME)
  .enter(async ctx => {
    const managers = await mailingService.getManagers();
    for (let manager of managers) {
      const text = `🟦 ID: ${manager.telegramId}\n🟥 USER: @${manager.username}`;
      await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply(text, mailingManagerKeyboardGenerator(manager.id)));
      sleepHelper(SLEEP_MS);
    }
    await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply('Рассылка 💬', mailingKeyboard));
  })
  .action(new RegExp(`${ACTION.DELETE}\/[0-9]+`), ctx => {
    ctx.match.index = +ctx.match[0].split('/')[1];
    ctx.scene.enter(ACTION.DELETE);
  })
  .action(new RegExp(`${ACTION.SCHEDULES}\/[0-9]+`), ctx => {
    ctx.match.index = +ctx.match[0].split('/')[1];
    ctx.scene.enter(ACTION.SCHEDULES);
  })
  .action(ACTION.ADD_MANAGER, ctx => ctx.scene.enter(ACTION.ADD_MANAGER))
  .action(ACTION.BACK, ctx => ctx.scene.enter(ACTION.BACK))
  .leave(ctx => clearMessageIdListInSessionHelper(ctx));