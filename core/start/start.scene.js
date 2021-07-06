import { Scenes } from 'telegraf';

import { 
  clearMessageIdListInSessionHelper, 
  saveMessageIdInSessionFromReplyHelper, 
  saveMessageIdInSessionFromQueryHelper 
} from '../../main/telegram/index.js';
import { START_ACTION_NAME } from './start.constant.js';
import { MENU_ACTION_NAME } from '../menu/index.js';
import { startService } from './start.service.js';

export const startScene = new Scenes.BaseScene(START_ACTION_NAME)
  .enter(async (ctx) => {
    const telegramId = ctx.message.from.id;
    const username = ctx.message.from.username;
    const text = `🎉 Добро пожаловать!\nВаш ID: <strong>${telegramId}</strong>`;
    await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply(text, { parse_mode: 'HTML' }));
    const isRegistered = await startService.isRegistered(telegramId);
    if (isRegistered) {
      console.log(1);
    } else {
      console.log(2);
      await startService.register(telegramId, username);
    }
    
  })
  .on('text', async (ctx) => {
    saveMessageIdInSessionFromQueryHelper(ctx);
    if (ctx.message.text === '12345') {
      ctx.scene.enter(MENU_ACTION_NAME);
    } else {
      await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply('Неверный пароль!'));
      setTimeout(() => ctx.scene.reenter(), 1000);
    }
  })
  .on('message', async ctx => {
    saveMessageIdInSessionFromQueryHelper(ctx);
    const text = 'Тут не файлы кидать нужно! А ввести пароль!';
    await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply(text));
    setTimeout(() => ctx.scene.reenter(), 2000);
  })
  .leave((ctx) => {
    clearMessageIdListInSessionHelper(ctx);
  });