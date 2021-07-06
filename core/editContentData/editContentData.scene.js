import { Scenes } from 'telegraf';

import { EDIT_CONTENT_DATA_ACTION_NAME, ACTION } from './editContentData.constant.js';
import { saveMessageIdInSessionFromReplyHelper, clearMessageIdListInSessionHelper, saveMessageIdInSessionFromQueryHelper } from '../../main/telegram/index.js';
import { editContentDataService } from './editContentData.service.js';
import { editContentDataKeyboard } from './editContentData.keyboard.js';
import { FORMAT } from '../../lib/telegram/index.js';

const successMessage = 'Контент успешно изменен 👍';

export const editContentDataScene = new Scenes.BaseScene(EDIT_CONTENT_DATA_ACTION_NAME)
  .enter(async ctx => {
    ctx.session.contentId = ctx.match.index;
    const text = 'Добавьте новый контент 👇';
    await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply(text, editContentDataKeyboard));
  })
  .on(FORMAT.VIDEO, async ctx => {
    saveMessageIdInSessionFromQueryHelper(ctx);
    const data = ctx.message.video.file_id;
    await editContentDataService.updateContent(ctx.session.contentId, data, FORMAT.VIDEO);
    await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply(successMessage));
    setTimeout(() => ctx.scene.enter(ACTION.BACK), 1500);
  })
  .on(FORMAT.AUDIO, async ctx => {
    saveMessageIdInSessionFromQueryHelper(ctx);
    const data = ctx.message.audio.file_id;
    await editContentDataService.updateContent(ctx.session.contentId, data, FORMAT.AUDIO);
    await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply(successMessage));
    setTimeout(() => ctx.scene.enter(ACTION.BACK), 1500);
  })
  .on(FORMAT.VOICE, async ctx => {
    saveMessageIdInSessionFromQueryHelper(ctx);
    const data = ctx.message.voice.file_id;
    await editContentDataService.updateContent(ctx.session.contentId, data, FORMAT.VOICE);
    await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply(successMessage));
    setTimeout(() => ctx.scene.enter(ACTION.BACK), 1500);
  })
  .on(FORMAT.TEXT, async ctx => {
    saveMessageIdInSessionFromQueryHelper(ctx);
    const data = ctx.message.text;
    await editContentDataService.updateContent(ctx.session.contentId, data, FORMAT.TEXT);
    await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply(successMessage));
    setTimeout(() => ctx.scene.enter(ACTION.BACK), 1500);
  })
  .on(FORMAT.PHOTO, async ctx => {
    saveMessageIdInSessionFromQueryHelper(ctx);
    const data = ctx.message.photo[ctx.message.photo.length - 1].file_id;
    await editContentDataService.updateContent(ctx.session.contentId, data, FORMAT.PHOTO);
    await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply(successMessage));
    setTimeout(() => ctx.scene.enter(ACTION.BACK), 1500);
  })
  .on(FORMAT.DOCUMENT, async ctx => {
    saveMessageIdInSessionFromQueryHelper(ctx);
    const data = ctx.message.document.file_id;
    await editContentDataService.updateContent(ctx.session.contentId, data, FORMAT.DOCUMENT);
    await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply(successMessage));
    setTimeout(() => ctx.scene.enter(ACTION.BACK), 1500);
  })
  .action(ACTION.BACK, ctx => ctx.scene.enter(ACTION.BACK))
  .leave(ctx => {
    ctx.match = { index: ctx.session.contentId };
    delete ctx.session.contentId;
    clearMessageIdListInSessionHelper(ctx);
  });