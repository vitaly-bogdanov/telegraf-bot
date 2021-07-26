import { Scenes } from 'telegraf';

import { 
  saveMessageIdInSessionFromReplyHelper, 
  clearMessageIdListInSessionHelper, 
  saveMessageIdInSessionFromQueryHelper 
} from '../../main/telegram/index.js';
import { menuKeyboard } from './menu.keyboard.js';
import { MENU_ACTION_NAME, ACTION } from './menu.constant.js';

export const menuScene = new Scenes.BaseScene(MENU_ACTION_NAME)
  .enter(async ctx => await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply('📚 Главное меню', menuKeyboard)))
  .action(ACTION.CATEGORIES, ctx => ctx.scene.enter(ACTION.CATEGORIES))
  .action(ACTION.MAILING, ctx => ctx.scene.enter(ACTION.MAILING))
  .on('message', async ctx => {
    saveMessageIdInSessionFromQueryHelper(ctx);
    ctx.scene.reenter();
  })
  .leave(ctx => clearMessageIdListInSessionHelper(ctx))