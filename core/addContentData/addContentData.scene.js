import { Scenes } from 'telegraf';

import { ADD_CONTENT_DATA_ACTION_NAME, ACTION } from './addContentData.constant.js';
import { FORMAT } from '../../lib/telegram/index.js';
import {
  saveMessageIdInSessionFromReplyHelper,
  clearMessageIdListInSessionHelper,
  saveMessageIdInSessionFromQueryHelper
} from '../../main/telegram/index.js';
import { addContentDataService } from './addContentData.service.js';
import { addContentDataKeyboard } from './addContentData.keyboard.js';

export const addContentDataScene = new Scenes.BaseScene(ADD_CONTENT_DATA_ACTION_NAME)
  .enter(async ctx => {
    await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply('Добавьте контент (картинка, документ, видео, аудио, голосовое/текстовое сообщение) 👇', addContentDataKeyboard));
  })
  .on(FORMAT.PHOTO, async ctx => {
    saveMessageIdInSessionFromQueryHelper(ctx);
    const description = ctx.session.description;
    const categoryId = ctx.session.match.index;
    const data = ctx.message.photo[ctx.message.photo.length - 1].file_id;
    await addContentDataService.createContent({ description, categoryId, data, format: FORMAT.PHOTO });
    ctx.scene.enter(ACTION.BACK);
  })
  .on(FORMAT.DOCUMENT, async ctx => {
    saveMessageIdInSessionFromQueryHelper(ctx);
    const data = ctx.message.document.file_id;
    const description = ctx.session.description;
    const categoryId = ctx.session.match.index;
    await addContentDataService.createContent({ description, categoryId, data, format: FORMAT.DOCUMENT });
    ctx.scene.enter(ACTION.BACK);
  })
  .on(FORMAT.VIDEO, async ctx => {
    saveMessageIdInSessionFromQueryHelper(ctx);
    const data = ctx.message.video.file_id;
    const description = ctx.session.description;
    const categoryId = ctx.session.match.index;
    await addContentDataService.createContent({ description, categoryId, data, format: FORMAT.VIDEO });
    ctx.scene.enter(ACTION.BACK);
  })
  .on(FORMAT.VOICE, async ctx => {
    saveMessageIdInSessionFromQueryHelper(ctx);
    const data = ctx.message.voice.file_id;
    const description = ctx.session.description;
    const categoryId = ctx.session.match.index;
    await addContentDataService.createContent({ description, categoryId, data, format: FORMAT.VOICE });
    ctx.scene.enter(ACTION.BACK);
  })
  .on(FORMAT.AUDIO, async ctx => {
    saveMessageIdInSessionFromQueryHelper(ctx);
    const data = ctx.message.audio.file_id;
    const description = ctx.session.description;
    const categoryId = ctx.session.match.index;
    await addContentDataService.createContent({ description, categoryId, data, format: FORMAT.AUDIO });
    ctx.scene.enter(ACTION.BACK);
  })
  .on(FORMAT.TEXT, async ctx => {
    saveMessageIdInSessionFromQueryHelper(ctx);
    const data = ctx.message.text;
    const description = ctx.session.description;
    const categoryId = ctx.session.match.index;
    await addContentDataService.createContent({ description, categoryId, data, format: FORMAT.TEXT });
    ctx.scene.enter(ACTION.BACK);
  })
  .action(ACTION.BACK, ctx => {
    ctx.scene.enter(ACTION.BACK);
  })
  .leave(ctx => {
    ctx.match = ctx.session.match;
    delete ctx.session.description;
    delete ctx.session.match;
    clearMessageIdListInSessionHelper(ctx)
  });