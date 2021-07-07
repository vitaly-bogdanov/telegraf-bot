import { Markup } from 'telegraf';

import { ACTION } from './mailing.constant.js';

export const mailingKeyboard = Markup.inlineKeyboard([
  [
    Markup.button.callback('Добавить менеджера ➕', ACTION.ADD_MANAGER),
    Markup.button.callback('Назад 🔙', ACTION.BACK)
  ]
]).oneTime().resize();

export const mailingManagerKeyboardGenerator = (id) => Markup.inlineKeyboard([
  Markup.button.callback('Расписание 🕑', `${ACTION.SCHEDULES}/${id}`),
  Markup.button.callback('Удалить 🗑', `${ACTION.DELETE}/${id}`)
]).oneTime().resize();