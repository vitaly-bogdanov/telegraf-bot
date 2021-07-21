import { Scenes } from 'telegraf';

import { addCategoryKeyboard } from './addCategory.keyboard.js';
import { ADD_CATEGORY_ACTION_NAME, ACTION } from './addCategory.constant.js';
import { addCategoryService } from './addCategory.service.js'
import {
  saveMessageIdInSessionFromReplyHelper,
  clearMessageIdListInSessionHelper,
  saveMessageIdInSessionFromQueryHelper
} from '../../main/telegram/index.js';

export const addCategoryScene = new Scenes.BaseScene(ADD_CATEGORY_ACTION_NAME)
  .enter(async ctx => {
    const text = 'Введите название категории 👇';
    await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply(text, addCategoryKeyboard))
  })
  .action(ACTION.BACK, ctx => ctx.scene.enter(ACTION.BACK))
  .on('text', async ctx => {
    saveMessageIdInSessionFromQueryHelper(ctx);
    const categoryDescription = ctx.message.text;
    await addCategoryService.createCategory(categoryDescription);
    const text = 'Категория успешно создана 👍'
    await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply(text))
    setTimeout(() => ctx.scene.enter(ACTION.BACK), 800);
  })
  .on('message', async ctx => {
    saveMessageIdInSessionFromQueryHelper(ctx);
    const text = 'Нужно указать название для категории!';
    await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply(text));
    setTimeout(() => {
      ctx.scene.reenter();
    }, 2000);
  })
  .leave(ctx => clearMessageIdListInSessionHelper(ctx));