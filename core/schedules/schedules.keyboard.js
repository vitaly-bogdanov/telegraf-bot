import { Markup } from 'telegraf';

import { ACTION } from './schedules.constant.js';

/**
 * 
 * @param {array} schedules
 */
export const scheduleKeyboardGenerator = (schedules) => {
  const buttons = schedules.reverse().reduce((memo, schedule) => {
    memo.push([Markup.button.callback(`${schedule.dayName}`, `${ACTION.SCHEDULES}/${schedule.id}`)]);
    return memo;
  }, [ [Markup.button.callback('Назад 🔙', `${ACTION.BACK}`)] ]);

  return Markup.inlineKeyboard(buttons.reverse()).oneTime().resize();
};