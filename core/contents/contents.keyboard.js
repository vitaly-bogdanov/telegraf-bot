import { Markup } from 'telegraf';

import { ACTION } from './contents.constant.js';

// export const categoryKeyboardGenerator = (categoryId) => {
//   return Markup.inlineKeyboard([
//     Markup.button.callback('Обзор', `${ACTION.VIEW}/${categoryId}`),
//     Markup.button.callback('Удалить', `${ACTION.DELETE}/${categoryId}`)
//   ]).oneTime().resize();
// };

export const contentsKeyboard = Markup.inlineKeyboard([
  Markup.button.callback('Добавить ➕', ACTION.ADD_CONTENT),
  Markup.button.callback('Назад 🔙', ACTION.BACK)
]).oneTime().resize();