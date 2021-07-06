import { Scenes } from 'telegraf';

import { CATEGORIES_ACTION_NAME, ACTION } from './categories.constant.js';
import { 
  saveMessageIdInSessionFromReplyHelper, 
  clearMessageIdListInSessionHelper 
} from '../../main/telegram/index.js';
import { categoriesKeyboard, categoryKeyboardGenerator } from './categories.keyboard.js';
import { categoriesService } from './categories.service.js';
import { sleepHelper, SLEEP_MS } from '../../lib/telegram/index.js';

export const categoriesScene = new Scenes.BaseScene(CATEGORIES_ACTION_NAME)
  .enter(async (ctx) => {
    const categories = await categoriesService.getCategories();
    for (let category of categories) {
      const categoryDescription = `📗 ${category.description}`;
      await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply(categoryDescription, categoryKeyboardGenerator(category.id)));
      sleepHelper(SLEEP_MS);
    }
    await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply('🗂 Категории ', categoriesKeyboard));
  })
  .action(new RegExp(`${ACTION.VIEW}\/[0-9]+`), ctx => { 
    ctx.match.index = +ctx.match[0].split('/')[1];
    ctx.scene.enter(ACTION.VIEW);
  })
  .action(new RegExp(`${ACTION.DELETE}\/[0-9]+`), ctx => { 
    ctx.match.index = +ctx.match[0].split('/')[1];
    ctx.scene.enter(ACTION.DELETE);
  })
  .action(ACTION.ADD_CATEGORY, ctx => ctx.scene.enter(ACTION.ADD_CATEGORY))
  .action(ACTION.BACK, ctx => ctx.scene.enter(ACTION.BACK))
  .leave((ctx) => clearMessageIdListInSessionHelper(ctx));