import { FORMAT, SLEEP_MS, sleepHelper } from '../../lib/telegram/index.js';
import { startTaskKeyboardGenerator } from './start.keyboard.js';
import { saveMessageIdInSessionFromReplyHelper } from '../../main/telegram/index.js';

export const startTaskRenderHelper = async (ctx, task) => {

  switch(task.content.format) {
    case FORMAT.PHOTO:
      sleepHelper(SLEEP_MS);
      await saveMessageIdInSessionFromReplyHelper(ctx, ctx.replyWithPhoto(task.content.data, startTaskKeyboardGenerator(task.id)));
      break;
    case FORMAT.TEXT:
      sleepHelper(SLEEP_MS);
      await saveMessageIdInSessionFromReplyHelper(ctx, ctx.reply(task.content.data, startTaskKeyboardGenerator(task.id)));
      break;
    case FORMAT.VIDEO:
      sleepHelper(SLEEP_MS);
      await saveMessageIdInSessionFromReplyHelper(ctx, ctx.replyWithVideo(task.content.data, startTaskKeyboardGenerator(task.id)));
      break;
    case FORMAT.VOICE:
      sleepHelper(SLEEP_MS);
      await saveMessageIdInSessionFromReplyHelper(ctx, ctx.replyWithVoice(task.content.data, startTaskKeyboardGenerator(task.id)));
      break;
    case FORMAT.DOCUMENT:
      sleepHelper(SLEEP_MS);
      await saveMessageIdInSessionFromReplyHelper(ctx, ctx.replyWithDocument(task.content.data, startTaskKeyboardGenerator(task.id)));
      break;
    case FORMAT.AUDIO:
      sleepHelper(SLEEP_MS);
      await saveMessageIdInSessionFromReplyHelper(ctx, ctx.replyWithAudio(task.content.data, startTaskKeyboardGenerator(task.id)));
  }
}