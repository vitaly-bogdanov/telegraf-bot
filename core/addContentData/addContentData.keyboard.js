import { Markup } from 'telegraf';

import { ACTION } from './addContentData.constant.js';

export const addContentDataKeyboard = Markup.inlineKeyboard([
  Markup.button.callback('Отмена ⛔️', ACTION.BACK),
]).oneTime().resize();