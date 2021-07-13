import { Scenes } from 'telegraf';

import { 
  saveMessageIdInSessionFromReplyHelper,
  clearMessageIdListInSessionHelper
} from '../../main/telegram/index.js';
import { timeSetCategoryService } from './timeSetCategory.service.js';
import { TIME_SET_CATEGORY, ACTION } from './timeSetCategory.constant.js';
import { timeSetCategoryKeyboardGenerator } from './timeSetCategory.keyboard.js';
import { sleepHelper, SLEEP_MS } from '../../lib/telegram/index.js';

export const timeSetCategoryScene = new Scenes.BaseScene(TIME_SET_CATEGORY)
  .enter(async ctx => {
    ctx.session.timeId = ctx.match.index;
    const currentTime = await timeSetCategoryService.getCurrentTimeWithCategory(ctx.session.timeId);
    const categories = await timeSetCategoryService.getCategories(ctx.session.timeId);
    const text = `Выбранная категория: ${currentTime.category ? currentTime.category.description : 'пусто'}\nДоступные категории: `;
    await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply(text, timeSetCategoryKeyboardGenerator(categories)));
  })
  .action(new RegExp(`${ACTION.SET}\/[0-9]+`), async ctx => {
    const categoryId = +ctx.match[0].split('/')[1];
    await timeSetCategoryService.setCategory(ctx.session.timeId, categoryId);
    await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply('✅ Готово!'));
    setTimeout(() => ctx.scene.enter(ACTION.BACK), 500);
  })
  .action(ACTION.BACK, ctx => {
    ctx.scene.enter(ACTION.BACK);
  })
  .leave(ctx => {
    ctx.match.index = ctx.session.timeId;
    delete ctx.session.timeId;
    clearMessageIdListInSessionHelper(ctx);
  });
