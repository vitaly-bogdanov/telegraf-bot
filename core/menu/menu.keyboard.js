import { Markup } from 'telegraf';

import { CATEGORIES_ACTION_NAME } from '../categories/index.js';
import {  } from '../mailing/index.js';

export const menuButtons = Markup.inlineKeyboard([
  Markup.button.callback('Категории 🗂', CATEGORIES_ACTION_NAME),
  Markup.button.callback('Рассылка 💬', 'mailing'),
]).oneTime().resize();