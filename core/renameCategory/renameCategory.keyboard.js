import { Markup } from 'telegraf';
import { ACTION } from './renameCategory.constant.js';

export const renameCategoryKeyboard = Markup.inlineKeyboard([
  Markup.button.callback('Отмена ⛔️', ACTION.BACK)
]).oneTime().resize();