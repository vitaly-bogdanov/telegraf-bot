import { Markup } from 'telegraf';

import { ACTION } from './deleteManager.constant.js';

export const deleteManagerKeyboard = Markup.inlineKeyboard([
  Markup.button.callback('Да ✅', ACTION.YES),
  Markup.button.callback('Нет ❌', ACTION.NO)
]).oneTime().resize();