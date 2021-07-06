import { Scenes } from 'telegraf';

import { saveMessageIdInSessionFromReplyHelper, clearMessageIdListInSessionHelper, saveMessageIdInSessionFromQueryHelper } from '../../main/telegram/index.js';
import { EDIT_CONTENT_DESCRIPTION_ACTION_NAME, ACTION } from './editContentDescription.constant.js';
import { editContentDescriptionService } from './editContentDescription.service.js';
import { editContentDescriptionKeyboard } from './editContentDescription.keyboard.js';

export const editContentDescriptionScene = new Scenes.BaseScene(EDIT_CONTENT_DESCRIPTION_ACTION_NAME)
  .enter(async ctx => {
    ctx.session.contentId = ctx.match.index;
    const text = 'Введите новое описание для выбранного контента 👇';
    await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply(text, editContentDescriptionKeyboard));
  })
  .on('text', async ctx => {
    saveMessageIdInSessionFromQueryHelper(ctx);
    await editContentDescriptionService.updateContent(ctx.session.contentId, ctx.message.text);
    const text = 'Описание успешно отредактированно 👍';
    await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply(text));
    setTimeout(() => ctx.scene.enter(ACTION.BACK), 1500);
  })
  .action(ACTION.BACK, ctx => {
    ctx.scene.enter(ACTION.BACK);
  })
  .on('message', async ctx => {
    const text = 'Не валидный формат!';
    await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply(text));
    setTimeout(() => {
      ctx.scene.reenter();
    }, 1500);
  })
  .leave(ctx => {
    ctx.match = { index: ctx.session.contentId };
    delete ctx.session.contentId;
    clearMessageIdListInSessionHelper(ctx);
  });