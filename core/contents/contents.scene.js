import { Scenes } from 'telegraf';

import { saveMessageIdInSessionFromReplyHelper, clearMessageIdListInSessionHelper } from '../../main/telegram/index.js';
import { CONTENTS_ACTION_NAME, ACTION } from './contents.constant.js';
import { contentsKeyboard, contentKeyboardGenerator } from './contents.keyboard.js';
import { contentsService } from './contents.service.js';

export const contentsScene = new Scenes.BaseScene(CONTENTS_ACTION_NAME)
  .enter(async ctx => {
    const categoryId = ctx.match.index;
    ctx.session.match = ctx.match;
    const currentCategory = await contentsService.getCategoryDescriptionWhithContents(categoryId);
    const categoryDescription = currentCategory.description;
    for (let content of currentCategory.contents) {
      let contentDescription = `📕 ${content.description}`
      await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply(contentDescription, contentKeyboardGenerator(content.id)));
    }
    const text = `📗 Контент категории: "${categoryDescription}"`
    await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply(text, contentsKeyboard));
  })
  .action(ACTION.ADD_CONTENT, ctx => {
    ctx.match = ctx.session.match;
    ctx.scene.enter(ACTION.ADD_CONTENT);
  })
  .action(new RegExp(`${ACTION.CHANGE}\/[0-9]+`), ctx => {
    ctx.match.index = +ctx.match[0].split('/')[1];
    ctx.scene.enter(ACTION.CHANGE);
  })
  .action(new RegExp(`${ACTION.DELETE}\/[0-9]+`), ctx => {
    ctx.match.index = +ctx.match[0].split('/')[1];
    ctx.scene.enter(ACTION.DELETE);
  })
  .action(ACTION.BACK, ctx => ctx.scene.enter(ACTION.BACK))
  .leave(ctx => clearMessageIdListInSessionHelper(ctx));