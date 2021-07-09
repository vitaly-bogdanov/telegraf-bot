import { Markup } from 'telegraf';

import { ACTION } from './start.constant.js';

export const startTaskKeyboardGenerator = (taskId) => {
  return Markup.inlineKeyboard([
    Markup.button.callback('✅ Убрать', `${ACTION.REMOVE}/${taskId}`),
    Markup.button.callback('📤 Заменить', `${ACTION.REPLACE}/${taskId}`)
  ]).oneTime().resize();
} 