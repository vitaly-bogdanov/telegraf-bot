import { Scenes } from 'telegraf';

import { saveMessageIdInSessionFromReplyHelper, clearMessageIdListInSessionHelper, saveMessageIdInSessionFromQueryHelper } from '../../main/telegram/index.js';
import { CHANGE_CONTENT_ACTION_NAME, ACTION } from './changeContent.constant.js';
import { changeContentService } from './changeContent.service.js';
import { FORMAT } from '../../lib/telegram/index.js';
import { changeContentKeyboard } from './changeContent.keyboard.js';

export const changeContentScene = new Scenes.BaseScene(CHANGE_CONTENT_ACTION_NAME)
  .enter(async ctx => {
    ctx.session.contentId = ctx.match.index;
    const content = await changeContentService.getContent(ctx.session.contentId);
    ctx.session.categoryId = content.categoryId;
    await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply('Контент: '));
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
    const text = `Описание контента: \n ${content.description}`;
    await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply(text, changeContentKeyboard));
  })
  .action(ACTION.DESCRIPTION, ctx => {

  })
  .action(ACTION.DATA, ctx => {

  })
  .action(ACTION.BACK, ctx => {
    ctx.match.index = ctx.session.categoryId;
    ctx.scene.enter(ACTION.BACK);
  })
  .leave(ctx => {
    clearMessageIdListInSessionHelper(ctx);
  });