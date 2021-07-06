import { Markup } from 'telegraf';

import { ACTION } from './addCategory.constant.js';

export const addCategoryKeyboard = Markup.inlineKeyboard([
  Markup.button.callback('Назад 🔙', ACTION.BACK),
]).oneTime().resize();