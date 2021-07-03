import { Scenes } from 'telegraf';

import { saveMessageIdInSessionFromReplyHelper, clearMessageIdListInSessionHelper, saveMessageIdMessageIdInSessionFromQueryHelper } from '../../main/telegram/index.js';
import { ADD_CATEGORY_ACTION_NAME, ACTION } from './addCategory.constant.js';
import { addCategoryKeyboard } from './addCategory.keyboard.js';

export const addCategoryScene = new Scenes.BaseScene(ADD_CATEGORY_ACTION_NAME)
  .enter(async ctx => {
    const text = 'Введите название категории 👇';
    await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply(text, addCategoryKeyboard))
  })
  .action(ACTION.BACK, ctx => ctx.scene.enter(ACTION.BACK))
  .on('text', ctx => {
    saveMessageIdMessageIdInSessionFromQueryHelper(ctx);
    

  })
  .on('message', async ctx => {
    saveMessageIdMessageIdInSessionFromQueryHelper(ctx);
    const text = 'Нужно указать название для категории!';
    await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply(text));
    setTimeout(() => {
      ctx.scene.reenter();
    }, 2000);
  })
  .leave(ctx => clearMessageIdListInSessionHelper(ctx))