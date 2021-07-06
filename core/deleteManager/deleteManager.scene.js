import { Scenes } from 'telegraf';

import { DELETE_MANAGER_ACTION_NAME, ACTION } from './deleteManager.constant.js';
import { 
  saveMessageIdInSessionFromReplyHelper,
  clearMessageIdListInSessionHelper,
  saveMessageIdInSessionFromQueryHelper 
} from '../../main/telegram/index.js';
import { deleteManagerKeyboard } from './deleteManager.keyboard.js';

export const deleteManagerScene = new Scenes.BaseScene(DELETE_MANAGER_ACTION_NAME)
  .enter(async ctx => {
    await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply('Введите ID мененджера 👇', deleteManagerKeyboard));
  })
  .on('text', async ctx => {
    saveMessageIdInSessionFromQueryHelper(ctx);
    console.log(ctx);
  })
  .leave(ctx => clearMessageIdListInSessionHelper(ctx));