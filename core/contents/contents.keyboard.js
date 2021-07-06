import { Markup } from 'telegraf';

import { ACTION } from './contents.constant.js';

export const contentKeyboardGenerator = (contentId) => {
  return Markup.inlineKeyboard([
    Markup.button.callback('Редактировать 📝', `${ACTION.CHANGE}/${contentId}`),
    Markup.button.callback('Удалить 🗑', `${ACTION.DELETE}/${contentId}`)
  ]).oneTime().resize();
};

export const contentsKeyboard = Markup.inlineKeyboard([
  Markup.button.callback('Добавить ➕', ACTION.ADD_CONTENT),
  Markup.button.callback('Назад 🔙', ACTION.BACK)
]).oneTime().resize();