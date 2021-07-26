import { Scenes } from 'telegraf';

import { EDIT_CONTENT_DATA_ACTION_NAME, ACTION } from './editContentData.constant.js';
import { 
  saveMessageIdInSessionFromReplyHelper, 
  clearMessageIdListInSessionHelper, 
  saveMessageIdInSessionFromQueryHelper 
} from '../../main/telegram/index.js';
import { editContentDataService } from './editContentData.service.js';
import { editContentDataKeyboard } from './editContentData.keyboard.js';
import { FORMAT } from '../../lib/telegram/index.js';

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
    ctx.scene.enter(ACTION.BACK);
  })
  .on(FORMAT.AUDIO, async ctx => {
    saveMessageIdInSessionFromQueryHelper(ctx);
    const data = ctx.message.audio.file_id;
    await editContentDataService.updateContent(ctx.session.contentId, data, FORMAT.AUDIO);
    ctx.scene.enter(ACTION.BACK);
  })
  .on(FORMAT.VOICE, async ctx => {
    saveMessageIdInSessionFromQueryHelper(ctx);
    const data = ctx.message.voice.file_id;
    await editContentDataService.updateContent(ctx.session.contentId, data, FORMAT.VOICE);
    ctx.scene.enter(ACTION.BACK);
  })
  .on(FORMAT.TEXT, async ctx => {
    saveMessageIdInSessionFromQueryHelper(ctx);
    const data = ctx.message.text;
    await editContentDataService.updateContent(ctx.session.contentId, data, FORMAT.TEXT);
    ctx.scene.enter(ACTION.BACK);
  })
  .on(FORMAT.PHOTO, async ctx => {
    saveMessageIdInSessionFromQueryHelper(ctx);
    const data = ctx.message.photo[ctx.message.photo.length - 1].file_id;
    await editContentDataService.updateContent(ctx.session.contentId, data, FORMAT.PHOTO);
    ctx.scene.enter(ACTION.BACK);
  })
  .on(FORMAT.DOCUMENT, async ctx => {
    saveMessageIdInSessionFromQueryHelper(ctx);
    const data = ctx.message.document.file_id;
    await editContentDataService.updateContent(ctx.session.contentId, data, FORMAT.DOCUMENT);
    ctx.scene.enter(ACTION.BACK);
  })
  .action(ACTION.BACK, ctx => ctx.scene.enter(ACTION.BACK))
  .leave(ctx => {
    ctx.match = { index: ctx.session.contentId };
    delete ctx.session.contentId;
    clearMessageIdListInSessionHelper(ctx);
  });