import { Markup } from 'telegraf';

import { ACTION } from './deleteManager.constant.js';

export const deleteManagerKeyboard = Markup.inlineKeyboard([
  Markup.button.callback('Назад 🔙', ACTION.BACK),
]).oneTime().resize();