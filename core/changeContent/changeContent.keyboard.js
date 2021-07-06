import { Markup } from 'telegraf';
import { ACTION } from './changeContent.constant.js';

export const changeContentKeyboard = Markup.inlineKeyboard([
  [
    Markup.button.callback('Изменить описание', ACTION.DESCRIPTION),
    Markup.button.callback('Изменить контент', ACTION.DATA)
  ],
  [
    Markup.button.callback('Назад 🔙', ACTION.BACK)
  ]
]).oneTime().resize();