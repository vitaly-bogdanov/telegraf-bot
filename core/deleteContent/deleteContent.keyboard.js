import { Markup } from 'telegraf';
import { ACTION } from './deleteContent.constant.js';

export const deleteContentKeyboard = Markup.inlineKeyboard([
  Markup.button.callback('Да ✅', ACTION.YES),
  Markup.button.callback('Нет ❌', ACTION.NO)
]).oneTime().resize();