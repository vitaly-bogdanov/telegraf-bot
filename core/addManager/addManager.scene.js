import { Scenes } from 'telegraf';

import { 
  saveMessageIdInSessionFromReplyHelper,
  clearMessageIdListInSessionHelper,
  saveMessageIdInSessionFromQueryHelper 
} from '../../main/telegram/index.js';
import { ADD_MANAGER_ACTION_NAME, ACTION } from './addManager.constant.js';
import { addCategoryKeyboard } from './addManager.keyboard.js';

export const addManagerScene = new Scenes.BaseScene(ADD_MANAGER_ACTION_NAME)
  .enter(async ctx => {
    const text = 'Введите ID менеджера 👇';
    await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply(text, addCategoryKeyboard))
  })
  .action(ACTION.BACK, ctx => ctx.scene.enter(ACTION.BACK))
  .on('text', ctx => {
    saveMessageIdInSessionFromQueryHelper(ctx);
    

  })
  .on('message', async ctx => {
    saveMessageIdInSessionFromQueryHelper(ctx);
    const text = 'Нужен ID менеджера! А не вот это все!';
    await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply(text));
    setTimeout(() => {
      ctx.scene.reenter();
    }, 2000);
  })
  .leave(ctx => clearMessageIdListInSessionHelper(ctx))