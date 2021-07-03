import { Scenes } from 'telegraf';

import { mailingKeyboard } from './mailing.keyboard.js';
import { MAILING_ACTION_NAME, ACTION } from './mailing.constant.js';
import { saveMessageIdInSessionFromReplyHelper, clearMessageIdListInSessionHelper } from '../../main/telegram/index.js';

export const mailingScene = new Scenes.BaseScene(MAILING_ACTION_NAME)
  .enter(async ctx => await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply('Рассылка', mailingKeyboard)))
  .action(ACTION.BACK, ctx => ctx.scene.enter(ACTION.BACK))
  .action(ACTION.ADD_MANAGER, ctx => ctx.scene.enter(ACTION.ADD_MANAGER))
  .leave(ctx => clearMessageIdListInSessionHelper(ctx))