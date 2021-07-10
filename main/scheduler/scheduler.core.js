import cron from 'node-cron';
import dotenv from 'dotenv';

import { scheduleService } from './scheduler.service.js';
import { getTodaysNumberHelper, getRandomIntFromIntervalHoursAdnMinutes } from './sceduler.helper.js';
import { schedulerEmitter } from './schedule.emitter.js';
import { SCHEDULER_EVENT_NAME } from './scheduler.constant.js';

dotenv.config();

const scheduleConfig = { timezone: process.env.SCHEDULER_TIME_ZONE, scheduled: true };

const h = +process.env.EVERY_DAY_PLANING_TIME.split(':')[0];
const m = +process.env.EVERY_DAY_PLANING_TIME.split(':')[1];

export const startSchedule = async () => {
  cron.schedule(`0 ${m} ${h} * * *`, async () => {
    const dayNumber = getTodaysNumberHelper();
    const schedules = await scheduleService.getSchedules(dayNumber);
    for (let schedule of schedules) {
      for (let time of schedule.times) {
        if (time.categoryId) {
          console.log(time)
          const randomContent = await scheduleService.getRandomContent(time.categoryId, schedule.userId);
          if (randomContent) {
            const { randomHours, randomMinutes } = getRandomIntFromIntervalHoursAdnMinutes(time.value);
            console.log(randomHours, randomMinutes, 'random');
            cron.schedule(`0 ${randomMinutes} ${randomHours} * * *`, async () => {
              console.log(schedule.userId, randomContent.id, 'in schedule');
              const task = await scheduleService.createTask(schedule.userId, randomContent.id);
              schedulerEmitter.emit(`${SCHEDULER_EVENT_NAME}-${schedule.user.telegramId}`, task);
            }, scheduleConfig);
          }
        }
      }
    }
  }, scheduleConfig);
};
