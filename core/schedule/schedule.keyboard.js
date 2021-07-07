import { Markup } from 'telegraf';

import { ACTION } from './schedule.constant.js';

/**
 * 
 * @param {array} times
 * @returns 
 */
export const scheduleKeyboardGenerator = (schedule) => {
  const buttons = schedule.times.reverse().reduce((memo, time) => {
    const text = `🕐 ${time.value} | 🗂  ${time.category ? time.category.description : "пусто"}`;
    memo.push([Markup.button.callback(text, `${ACTION.SCHEDULE}/${time.id}`)]);
    return memo;
  }, [ [Markup.button.callback('Назад 🔙', ACTION.BACK)] ]);

  return Markup.inlineKeyboard(buttons.reverse()).oneTime().resize();
};