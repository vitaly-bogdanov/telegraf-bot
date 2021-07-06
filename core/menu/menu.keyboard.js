import { Markup } from 'telegraf';

import { CATEGORIES_ACTION_NAME } from '../categories/index.js';

export const menuKeyboard = Markup.inlineKeyboard([
  Markup.button.callback('Категории 🗂', CATEGORIES_ACTION_NAME),
  Markup.button.callback('Рассылка 💬', 'mailing'),
]).oneTime().resize();