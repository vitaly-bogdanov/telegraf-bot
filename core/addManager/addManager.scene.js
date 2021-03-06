import { Scenes } from 'telegraf';

import { 
  saveMessageIdInSessionFromReplyHelper,
  clearMessageIdListInSessionHelper,
  saveMessageIdInSessionFromQueryHelper 
} from '../../main/telegram/index.js';
import { ADD_MANAGER_ACTION_NAME, ACTION } from './addManager.constant.js';
import { addCategoryKeyboard } from './addManager.keyboard.js';
import { addManagerService } from './addManager.service.js';
import { isTelegramIdValid } from '../../lib/telegram/index.js';

export const addManagerScene = new Scenes.BaseScene(ADD_MANAGER_ACTION_NAME)
  .enter(async ctx => {
    const text = 'Введите ID менеджера 👇';
    await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply(text, addCategoryKeyboard));
  })
  .action(ACTION.BACK, ctx => ctx.scene.enter(ACTION.BACK))
  .on('text', async ctx => {
    saveMessageIdInSessionFromQueryHelper(ctx);
    if (!isTelegramIdValid(ctx.message.text)) {
      await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply('Id невалиден!'));
      setTimeout(() => ctx.scene.reenter(), 1500);
      return;
    }
    const telegramId = +ctx.message.text;
    if (await addManagerService.isUserExist(telegramId)) {
      await addManagerService.setManagerRole(telegramId);
      await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply('Менеджер добавлен 👍'));
      setTimeout(() => ctx.scene.enter(ACTION.BACK), 1500);
    } else {
      await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply('Кажется такого пользователя нет в боте!\nПроверьте правильность написания ID'));
      setTimeout(() => ctx.scene.reenter(), 1500);
    }
  })
  .leave(ctx => clearMessageIdListInSessionHelper(ctx))