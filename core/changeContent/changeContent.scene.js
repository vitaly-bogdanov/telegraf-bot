import { Scenes } from 'telegraf';

import { 
  saveMessageIdInSessionFromReplyHelper, 
  clearMessageIdListInSessionHelper
} from '../../main/telegram/index.js';
import { CHANGE_CONTENT_ACTION_NAME, ACTION } from './changeContent.constant.js';
import { changeContentService } from './changeContent.service.js';
import { FORMAT } from '../../lib/telegram/index.js';
import { changeContentKeyboard } from './changeContent.keyboard.js';

export const changeContentScene = new Scenes.BaseScene(CHANGE_CONTENT_ACTION_NAME)
  .enter(async ctx => {
    ctx.session.contentId = ctx.match.index;
    const content = await changeContentService.getContent(ctx.session.contentId);
    ctx.session.categoryId = content.categoryId;
    await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply('<strong>Контент:</strong>', { parse_mode: 'HTML' }));
    switch(content.format) {
      case FORMAT.AUDIO:
        await saveMessageIdInSessionFromReplyHelper(ctx, ctx.replyWithAudio(content.data));
        break;
      case FORMAT.DOCUMENT:
        await saveMessageIdInSessionFromReplyHelper(ctx, ctx.replyWithDocument(content.data));
        break;
      case FORMAT.PHOTO:
        await saveMessageIdInSessionFromReplyHelper(ctx, ctx.replyWithPhoto(content.data));
        break;
      case FORMAT.TEXT:
        await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply(content.data));
        break;
      case FORMAT.VOICE:
        await saveMessageIdInSessionFromReplyHelper(ctx, ctx.replyWithVoice(content.data));
        break;
      case FORMAT.VIDEO:
        await saveMessageIdInSessionFromReplyHelper(ctx, ctx.replyWithVideo(content.data));
    }
    await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply('<strong>Описание контента:</strong>', { parse_mode: 'HTML' }));
    await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply(content.description, changeContentKeyboard));
  })
  .action(ACTION.DESCRIPTION, ctx => {
    ctx.match.index = ctx.session.contentId;
    ctx.scene.enter(ACTION.DESCRIPTION);
  })
  .action(ACTION.DATA, ctx => {
    ctx.match.index = ctx.session.contentId;
    ctx.scene.enter(ACTION.DATA);
  })
  .action(ACTION.BACK, ctx => {
    ctx.match.index = ctx.session.categoryId;
    ctx.scene.enter(ACTION.BACK);
  })
  .leave(ctx => {
    delete ctx.session.categoryId;
    clearMessageIdListInSessionHelper(ctx);
  });