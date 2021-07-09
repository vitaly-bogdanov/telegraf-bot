import { Scenes } from 'telegraf';

import { 
  clearMessageIdListInSessionHelper, 
  saveMessageIdInSessionFromReplyHelper, 
  saveMessageIdInSessionFromQueryHelper 
} from '../../main/telegram/index.js';
import { START_ACTION_NAME, ACTION } from './start.constant.js';
import { MENU_ACTION_NAME } from '../menu/index.js';
import { startService } from './start.service.js';
import { schedulerEmitter } from '../../main/scheduler/index.js';
import { SCHEDULER_EVENT_NAME } from '../../main/scheduler/index.js';
import { FORMAT, SLEEP_MS, ROLE, sleepHelper } from '../../lib/telegram/index.js';
import { startTaskKeyboardGenerator } from './start.keyboard.js';

export const startScene = new Scenes.BaseScene(START_ACTION_NAME)
  .enter(async (ctx) => {
    const telegramId = ctx.message?.from.id || ctx.session.telegramId;
    schedulerEmitter.on(`${SCHEDULER_EVENT_NAME}-${telegramId}`, async () => ctx.scene.reenter());
    const username = ctx.message?.from.username || ctx.session.username;
    if (!ctx.session.telegramId) ctx.session.telegramId = telegramId;
    if (!ctx.session.username) ctx.session.username = username;
    const text = `🎉 Добро пожаловать!\nВаш ID: <strong>${telegramId}</strong>`;
    await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply(text, { parse_mode: 'HTML' }));
    const isRegistered = await startService.isRegistered(telegramId);
    !isRegistered && await startService.register(telegramId, username);
    const currentUser = await startService.getCurrentUser(telegramId);
    ctx.session.currentUser = currentUser;
    if (ctx.session.currentUser.role === ROLE.UNCONFIRMED) {
      await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply('Не подтвержденный аккаунт! Нужно передать ваш ID админу.'));
    }
    if (ctx.session.currentUser.role === ROLE.MANAGER) {
      await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply('📢 Входящие рассылки: '));
      const tasks = await startService.getTasks(telegramId);
      for (let task of tasks) {
        switch(task.content.format) {
          case FORMAT.PHOTO:
            sleepHelper(SLEEP_MS);
            await saveMessageIdInSessionFromReplyHelper(ctx, ctx.replyWithPhoto(task.content.data));
            await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply(task.content.description, startTaskKeyboardGenerator(task.id)));
            break;
          case FORMAT.TEXT:
            sleepHelper(SLEEP_MS);
            await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply(task.content.data));
            await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply(task.content.description, startTaskKeyboardGenerator(task.id)));
            break;
          case FORMAT.VIDEO:
            sleepHelper(SLEEP_MS);
            await saveMessageIdInSessionFromReplyHelper(ctx, ctx.replyWithVideo(task.content.data));
            await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply(task.content.description, startTaskKeyboardGenerator(task.id)));
            break;
          case FORMAT.VOICE:
            sleepHelper(SLEEP_MS);
            await saveMessageIdInSessionFromReplyHelper(ctx, ctx.replyWithVoice(task.content.data));
            await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply(task.content.description, startTaskKeyboardGenerator(task.id)));
            break;
          case FORMAT.DOCUMENT:
            sleepHelper(SLEEP_MS);
            await saveMessageIdInSessionFromReplyHelper(ctx, ctx.replyWithDocument(task.content.data));
            await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply(task.content.description, startTaskKeyboardGenerator(task.id)));
            break;
          case FORMAT.AUDIO:
            sleepHelper(SLEEP_MS);
            await saveMessageIdInSessionFromReplyHelper(ctx, ctx.replyWithAudio(task.content.data));
            await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply(task.content.description, startTaskKeyboardGenerator(task.id)));
        }
      }
    }
  })
  .on('text', async (ctx) => {
    const password = ctx.message.text;
    saveMessageIdInSessionFromQueryHelper(ctx);
    if (ctx.session.currentUser.role === ROLE.ADMIN) {
      if ((await startService.passwordValidate(ctx.session.currentUser.id, password))) {
        ctx.scene.enter(MENU_ACTION_NAME);
      } else {
        await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply('Неверный пароль!'));
        setTimeout(() => ctx.scene.reenter(), 1000);
      }
    } else {
      ctx.scene.reenter();
    }
  })
  .action(new RegExp(`^${ACTION.REPLACE}/[0-9]+$`), async ctx => {
    const taskId = +ctx.match[0].split('/')[1];
    await startService.getRandomContentTask(taskId);
    ctx.scene.reenter();
  })
  .action(new RegExp(`^${ACTION.REMOVE}/[0-9]+$`), async ctx => {
    const taskId = +ctx.match[0].split('/')[1];
    await startService.setTaskComplete(taskId);
    ctx.scene.reenter();
  })
  .on('message', async ctx => {
    saveMessageIdInSessionFromQueryHelper(ctx);
    const text = 'Ошибка!';
    await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply(text));
    setTimeout(() => ctx.scene.reenter(), 2000);
  })
  .leave(ctx => {
    clearMessageIdListInSessionHelper(ctx);
  });