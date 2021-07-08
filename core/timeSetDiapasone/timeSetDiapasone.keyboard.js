import { Markup } from 'telegraf';

import { ACTION } from './timeSetDiapasone.constant.js';

export const timeSetDiapasoneKeyboard = Markup.inlineKeyboard([
  Markup.button.callback('Назад 🔙', ACTION.BACK),
]).oneTime().resize();