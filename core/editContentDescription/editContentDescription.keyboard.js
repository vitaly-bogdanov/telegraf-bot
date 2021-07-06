import { Markup } from 'telegraf';

import { ACTION } from './editContentDescription.constant.js';

export const editContentDescriptionKeyboard = Markup.inlineKeyboard([
  Markup.button.callback('Отмена ❌', ACTION.BACK),
]).oneTime().resize();