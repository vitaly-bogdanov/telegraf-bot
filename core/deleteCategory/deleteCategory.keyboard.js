import { Markup } from 'telegraf';
import { ACTION } from './deleteCategory.constant.js';

export const deleteCategoryKeyboard = Markup.inlineKeyboard([
  Markup.button.callback('Да ✅', ACTION.YES),
  Markup.button.callback('Нет ❌', ACTION.NO)
]).oneTime().resize();