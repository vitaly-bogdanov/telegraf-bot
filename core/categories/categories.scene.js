import { Scenes } from 'telegraf';

import { CATEGORIES_ACTION_NAME, ACTION } from './categories.constant.js';
import { saveMessageIdInSessionFromReplyHelper, clearMessageIdListInSessionHelper } from '../../main/telegram/index.js';
import { categoriesKeyboard } from './categories.keyboard.js';

export const categoriesScene = new Scenes.BaseScene(CATEGORIES_ACTION_NAME)
  .enter(async (ctx) => await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply('Категории', categoriesKeyboard)))

  .action(ACTION.ADD_CATEGORY, ctx => ctx.scene.enter(ACTION.ADD_CATEGORY))
  .action(ACTION.BACK, (ctx) => ctx.scene.enter(ACTION.BACK))

  .leave((ctx) => clearMessageIdListInSessionHelper(ctx))