import { Scenes } from 'telegraf';

import { DELETE_CONTENT_ACTION_NAME, ACTION } from './deleteContent.constant.js';
import { 
  saveMessageIdInSessionFromReplyHelper, 
  clearMessageIdListInSessionHelper 
} from '../../main/telegram/index.js';
import { deleteContentService } from './deleteContent.service.js';
import { deleteContentKeyboard } from './deleteContent.keyboard.js';

export const deleteContentScene = new Scenes.BaseScene(DELETE_CONTENT_ACTION_NAME)
  .enter(async ctx => {
    ctx.session.contentId = ctx.match.index;
    const content = await deleteContentService.getContent(ctx.session.contentId);
    ctx.session.categoryId = content.categoryId;
    await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply(`<strong>Описание контента:</strong> \n ${content.description}`, { parse_mode: 'HTML' } ));
    await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply('Вы уверенны, что хотетите удалить данный контент ❓', deleteContentKeyboard));
  })
  .action(ACTION.YES, async ctx => {
    await deleteContentService.deleteContent(ctx.session.contentId);
    ctx.scene.enter(ACTION.BACK);
  })
  .action(ACTION.NO, ctx => {
    ctx.scene.enter(ACTION.BACK);
  })
  .leave(ctx => {
    ctx.match.index = ctx.session.categoryId;
    delete ctx.session.categoryId;
    delete ctx.session.contentId;
    clearMessageIdListInSessionHelper(ctx);
  });
  