import { Markup } from 'telegraf';

import { ACTION } from './categories.constant.js';

export const categoryKeyboardGenerator = (categoryId) => {
  return Markup.inlineKeyboard([
    Markup.button.callback('Обзор', `${ACTION.VIEW}/${categoryId}`),
    Markup.button.callback('Удалить', `${ACTION.DELETE}/${categoryId}`)
  ]).oneTime().resize();
};

export const categoriesKeyboard = Markup.inlineKeyboard([
  Markup.button.callback('Добавить ➕', ACTION.ADD_CATEGORY),
  Markup.button.callback('Назад 🔙', ACTION.BACK)
]).oneTime().resize();