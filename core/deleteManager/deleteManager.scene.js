import { Scenes } from 'telegraf';

import { DELETE_MANAGER_ACTION_NAME, ACTION } from './deleteManager.constant.js';
import { 
  saveMessageIdInSessionFromReplyHelper,
  clearMessageIdListInSessionHelper
} from '../../main/telegram/index.js';
import { deleteManagerKeyboard } from './deleteManager.keyboard.js';
import { deleteManagerService } from './deleteManager.service.js';

export const deleteManagerScene = new Scenes.BaseScene(DELETE_MANAGER_ACTION_NAME)
  .enter(async ctx => {
    ctx.session.managerId = ctx.match.index;
    await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply('Вы уверенны, что хотите удалить менеджера ❓', deleteManagerKeyboard));
  })
  .action(ACTION.YES, async ctx => {
    await deleteManagerService.destroy(ctx.session.managerId);
    await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply('Менеджер успешно удален 🗑'));
    setTimeout(() => ctx.scene.enter(ACTION.BACK), 800);
  })
  .action(ACTION.NO, ctx => {
    ctx.scene.enter(ACTION.BACK);
  })
  .leave(ctx => {
    delete ctx.session.managerId;
    clearMessageIdListInSessionHelper(ctx)
  });