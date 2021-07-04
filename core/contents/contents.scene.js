import { Scenes } from 'telegraf';

import { saveMessageIdInSessionFromReplyHelper, clearMessageIdListInSessionHelper } from '../../main/telegram/index.js';
import { CONTENTS_ACTION_NAME } from './contents.constant.js';
import { contentsKeyboard } from './contents.keyboard.js';
import { contentsService } from './contents.service.js';

export const contentsScene = new Scenes.BaseScene(CONTENTS_ACTION_NAME)
  .enter(async ctx => {
    const categoryId = ctx.match.index;
    const currentCategory = await contentsService.getCategoryDescriptionWhithContents(categoryId);
    const categoryDescription = currentCategory.description;
    // const contents = currentCategory.contents;

    saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply(categoryDescription, contentsKeyboard));
  })
  .action('hjbhj', ctx => '')
  .action('lknjj', ctx => '')
  .leave(ctx => clearMessageIdListInSessionHelper(ctx));