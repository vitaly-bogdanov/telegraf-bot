import { Markup } from 'telegraf';

import { ACTION } from './editContentData.constant.js';

export const editContentDataKeyboard = Markup.inlineKeyboard([
  Markup.button.callback('Отмена ❌', ACTION.BACK),
]).oneTime().resize();