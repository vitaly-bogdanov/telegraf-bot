import { Markup } from 'telegraf';

import { ACTION } from './timeSetCategory.constant.js';

export const timeSetCategoryKeyboardGenerator = (categories) => {
  const buttons = categories.reduce((memo, category) => {
    memo.push([Markup.button.callback(`🗂 ${category.description}`, `${ACTION.SET}/${category.id}`)]);
    return memo;
  }, [ [Markup.button.callback('Назад 🔙', ACTION.BACK)] ]);
  return Markup.inlineKeyboard(buttons.reverse()).oneTime().resize();
};