import { Scenes } from 'telegraf';
import {
  saveMessageIdInSessionFromReplyHelper,
  clearMessageIdListInSessionHelper,
  saveMessageIdInSessionFromQueryHelper
} from '../../main/telegram/index.js';
import { ADD_CONTENT_DESCRIPTION_ACTION_NAME, ACTION } from './addContentDescription.constant.js';
import { addContentDescriptionKeyboard  } from './addContentDescription.keyboard.js';

export const addContentDescriptionScene = new Scenes.BaseScene(ADD_CONTENT_DESCRIPTION_ACTION_NAME)
  .enter(async ctx => {
    ctx.session.match = ctx.match;
    return await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply('Введите описание контента 👇', addContentDescriptionKeyboard ));
  })
  .on('text', async ctx => {
    ctx.session.description = ctx.message.text;
    saveMessageIdInSessionFromQueryHelper(ctx);
    ctx.scene.enter(ACTION.NEXT);
  })
  .action(ACTION.CANCEL, ctx => {
    ctx.match.index = ctx.session.match.index;
    delete ctx.session.description;
    delete ctx.session.match;
    ctx.scene.enter(ACTION.CANCEL);
  })
  .leave(ctx => {
    clearMessageIdListInSessionHelper(ctx) 
  });