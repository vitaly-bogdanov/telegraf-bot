import { Scenes } from 'telegraf';

import { RENAME_CATEGORY_ACTION_NAME, ACTION } from './renameCategory.constant.js';
import { 
  saveMessageIdInSessionFromReplyHelper, 
  clearMessageIdListInSessionHelper,
  saveMessageIdInSessionFromQueryHelper
} from '../../main/telegram/index.js';
import { renameCategoryKeyboard } from './renameCategory.keyboard.js';
import { renameCategoryService } from './renameCategory.service.js';

export const renameCategoryScene = new Scenes.BaseScene(RENAME_CATEGORY_ACTION_NAME)
  .enter(async ctx => {
    ctx.session.categoryId = ctx.match.index;
    await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply('Введите новое название категории 📝', renameCategoryKeyboard));
  })
  .action(ACTION.BACK, ctx => ctx.scene.enter(ACTION.BACK))
  .on('text', async ctx => {
    saveMessageIdInSessionFromQueryHelper(ctx);
    await renameCategoryService.updateDescription(ctx.session.categoryId, ctx.message.text);
    ctx.scene.enter(ACTION.BACK);
  })
  .leave(ctx => {
    delete ctx.session.categoryId;
    clearMessageIdListInSessionHelper(ctx);
  });
  