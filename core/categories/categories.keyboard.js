import { Markup } from 'telegraf';

import { ACTION } from './categories.constant.js';

export const categori = Markup.inlineKeyboard([
  Markup.button.callback('Обзор', 'view-category'),
  Markup.button.callback('Переименовать', 'rename-category'),
  Markup.button.callback('Удалить', 'delete-category')
]).oneTime().resize();

export const categoriesKeyboard = Markup.inlineKeyboard([
  [
    Markup.button.callback('Добавить ➕', ACTION.ADD_CATEGORY)
  ],
  [
    Markup.button.callback('Назад 🔙', ACTION.BACK)
  ]
]).oneTime().resize();