import { Scenes } from 'telegraf';

import { ADD_CONTENT_DATA_ACTION_NAME, ACTION, FORMAT } from './addContentData.constant.js';
import {
  saveMessageIdInSessionFromReplyHelper,
  clearMessageIdListInSessionHelper,
  saveMessageIdInSessionFromQueryHelper
} from '../../main/telegram/index.js';
import { addContentDataService } from './addContentData.service.js';
import { addContentDataKeyboard } from './addContentData.keyboard.js';

const successMessage = 'Контент создан 👍';

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
    await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply(successMessage));
    setTimeout(() => ctx.scene.enter(ACTION.BACK), 1500);
  })
  .on(FORMAT.DOCUMENT, async ctx => {
    saveMessageIdInSessionFromQueryHelper(ctx);
    const data = ctx.message.document.file_id;
    const description = ctx.session.description;
    const categoryId = ctx.session.match.index;
    await addContentDataService.createContent({ description, categoryId, data, format: FORMAT.DOCUMENT });
    await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply(successMessage));
    setTimeout(() => ctx.scene.enter(ACTION.BACK), 1500);
  })
  .on(FORMAT.VIDEO, async ctx => {
    saveMessageIdInSessionFromQueryHelper(ctx);
    const data = ctx.message.video.file_id;
    const description = ctx.session.description;
    const categoryId = ctx.session.match.index;
    await addContentDataService.createContent({ description, categoryId, data, format: FORMAT.VIDEO });
    await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply(successMessage));
    setTimeout(() => ctx.scene.enter(ACTION.BACK), 1500);
  })
  .on(FORMAT.VOICE, async ctx => {
    saveMessageIdInSessionFromQueryHelper(ctx);
    const data = ctx.message.voice.file_id;
    const description = ctx.session.description;
    const categoryId = ctx.session.match.index;
    await addContentDataService.createContent({ description, categoryId, data, format: FORMAT.VOICE });
    await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply(successMessage));
    setTimeout(() => ctx.scene.enter(ACTION.BACK), 1500);
  })
  .on(FORMAT.AUDIO, async ctx => {
    saveMessageIdInSessionFromQueryHelper(ctx);
    const data = ctx.message.audio.file_id;
    const description = ctx.session.description;
    const categoryId = ctx.session.match.index;
    await addContentDataService.createContent({ description, categoryId, data, format: FORMAT.AUDIO });
    await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply(successMessage));
    setTimeout(() => ctx.scene.enter(ACTION.BACK), 1500);
  })
  .on(FORMAT.TEXT, async ctx => {
    saveMessageIdInSessionFromQueryHelper(ctx);
    const data = ctx.message.text;
    const description = ctx.session.description;
    const categoryId = ctx.session.match.index;
    await addContentDataService.createContent({ description, categoryId, data, format: FORMAT.TEXT });
    await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply(successMessage));
    setTimeout(() => ctx.scene.enter(ACTION.BACK), 1500);
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