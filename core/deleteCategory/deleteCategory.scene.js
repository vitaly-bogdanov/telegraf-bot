import { Scenes } from 'telegraf';

import { DELETE_CATEGORY_ACTION_NAME, ACTION } from './deleteCategory.constant.js';
import { 
  saveMessageIdInSessionFromReplyHelper, 
  clearMessageIdListInSessionHelper 
} from '../../main/telegram/index.js';
import { deleteСategoryService } from './deleteCategory.service.js';
import { deleteCategoryKeyboard } from './deleteCategory.keyboard.js';

export const deleteCategoryScene = new Scenes.BaseScene(DELETE_CATEGORY_ACTION_NAME)
  .enter(async ctx => {
    const categoryId =  ctx.match.index;
    ctx.session.categoryId = categoryId;
    const categoryDescription = await deleteСategoryService.getCategoryDescription(categoryId);
    const categoryContentCount = await deleteСategoryService.getContentCountByCategoryId(categoryId);
    const categoryInfoText = `<strong>Количество контента:</strong> ${categoryContentCount}\n<strong>Описание категории:</strong> ${categoryDescription}`;
    await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply(categoryInfoText, { parse_mode: 'HTML' }));
    await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply('Вы уверенны, что хотетите удалить данную категорию ❓', deleteCategoryKeyboard));
  })
  .action(ACTION.YES, async ctx => {
    await deleteСategoryService.deleteCategoryWhithAllContent(ctx.session.categoryId);
    await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply('Категория успешно удалена 🗑'));
    setTimeout(() => { ctx.scene.enter(ACTION.BACK) }, 1500);
  })
  .action(ACTION.NO, ctx => {
    ctx.scene.enter(ACTION.BACK);
  })
  .leave(ctx => {
    delete ctx.session.categoryId;
    clearMessageIdListInSessionHelper(ctx)
  });