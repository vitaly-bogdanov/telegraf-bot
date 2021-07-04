import { Scenes } from 'telegraf';

import { CATEGORIES_ACTION_NAME, ACTION } from './categories.constant.js';
import { saveMessageIdInSessionFromReplyHelper, clearMessageIdListInSessionHelper } from '../../main/telegram/index.js';
import { categoriesKeyboard, categoryKeyboardGenerator } from './categories.keyboard.js';
import { categoriesService } from './categories.service.js';

export const categoriesScene = new Scenes.BaseScene(CATEGORIES_ACTION_NAME)
  .enter(async (ctx) => {
    const categories = await categoriesService.getCategories();
    for (let category of categories) {
      await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply(category.description, categoryKeyboardGenerator(category.id)));
      categoriesScene
        .action(`${ACTION.VIEW}/${category.id}`, ctx => { 
          ctx.match.index = category.id;
          ctx.scene.enter(ACTION.VIEW);
        })
        .action(`${ACTION.DELETE}/${category.id}`, ctx => { 
          ctx.match.index = category.id;
          ctx.scene.enter('kkkkhhk');
        });
    }
    await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply('Категории 🗂', categoriesKeyboard));
  })
  .action(ACTION.ADD_CATEGORY, ctx => ctx.scene.enter(ACTION.ADD_CATEGORY))
  .action(ACTION.BACK, ctx => ctx.scene.enter(ACTION.BACK))
  .leave((ctx) => clearMessageIdListInSessionHelper(ctx));