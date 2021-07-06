import { Markup } from 'telegraf';

import { ACTION } from './addContentDescription.constant.js';

export const addContentDescriptionKeyboard = Markup.inlineKeyboard([
  Markup.button.callback('Отмена ⛔️', ACTION.CANCEL),
]).oneTime().resize();