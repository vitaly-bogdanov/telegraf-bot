import { Markup } from 'telegraf';

import { ACTION } from './time.constant.js';

export const timeKeyboard = Markup.inlineKeyboard([
  [
    Markup.button.callback('🕑 Изменить время', ACTION.SET_TIME),
    Markup.button.callback('🗂 Изменить категорию', ACTION.SET_CATEGORY)
  ],
  [
    Markup.button.callback('Назад 🔙', ACTION.BACK)
  ]
]).oneTime().resize();