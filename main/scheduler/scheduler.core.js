import cron from 'node-cron';
import dotenv from 'dotenv';
import fs from 'fs';

import { scheduleService } from './scheduler.service.js';
import { getTodaysNumberHelper, getRandomIntFromIntervalHoursAdnMinutes } from './sceduler.helper.js';
import { schedulerEmitter } from './schedule.emitter.js';
import { SCHEDULER_EVENT_NAME } from './scheduler.constant.js';
import { sleepHelper } from '../../lib/telegram/index.js';

dotenv.config();

const scheduleConfig = { timezone: process.env.TZ, scheduled: true };

const config = JSON.parse(fs.readFileSync('./main/cli/cli.config.json', 'utf-8'))

console.log(config);

const h = +config['init-time'].split(':')[0];
const m = +config['init-time'].split(':')[1];

export const startSchedule = async () => {
  cron.schedule(`0 ${m} ${h} * * *`, async () => {
    const dayNumber = getTodaysNumberHelper();
    const schedules = await scheduleService.getSchedules(dayNumber);
    for (let schedule of schedules.reverse()) {
      for (let time of schedule.times) {
        if (time.categoryId) {
          const randomContent = await scheduleService.getRandomContent(time.categoryId, schedule.userId);
          if (randomContent) {
            const { randomHours, randomMinutes } = getRandomIntFromIntervalHoursAdnMinutes(time.value);
            cron.schedule(`0 ${randomMinutes} ${randomHours} * * *`, async () => {
              sleepHelper(5000)
              const task = await scheduleService.createTask(schedule.userId, randomContent.id);
              schedulerEmitter.emit(`${SCHEDULER_EVENT_NAME}-${schedule.user.telegramId}`, task)
            }, scheduleConfig);
          }
        }
      }
    }
  }, scheduleConfig);
};
