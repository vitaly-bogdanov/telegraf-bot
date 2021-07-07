import Prisma from '@prisma/client';

import { ROLE } from '../../lib/telegram/index.js';

const { PrismaClient } = Prisma;

class AddManagerService {
  
  constructor() { 
    this.prismaService = new PrismaClient();
    this.initialTimeValues = [
      { value: '10:00-11:25' },
      { value: '10:00-11:25' },
      { value: '14:00-15:00' },
      { value: '16:00-17:00' },
      { value: '18:00-19:00' },
      { value: '20:00-21:00' },
      { value: '22:00-23:00' }
    ];
  }

  async setManagerRole(telegramId) {
    return this.prismaService.user.update({ where: { telegramId }, data: { role: ROLE.MANAGER, schedules: {
      create: [
        { dayNumber: 1, dayName: 'Понедельник', times: { create: this.initialTimeValues } },
        { dayNumber: 2, dayName: 'Вторник', times: { create: this.initialTimeValues } },
        { dayNumber: 3, dayName: 'Среда', times: { create: this.initialTimeValues } },
        { dayNumber: 4, dayName: 'Четверг', times: { create: this.initialTimeValues } },
        { dayNumber: 5, dayName: 'Пятница', times: { create: this.initialTimeValues } },
        { dayNumber: 6, dayName: 'Суббота', times: { create: this.initialTimeValues } },
        { dayNumber: 0, dayName: 'Воскресенье', times: { create: this.initialTimeValues } }
      ]
    } } });
  }

  async isUserExist(telegramId) {
    return !!(this.prismaService.user.findUnique({ where: { telegramId } }));
  }

}

export const addManagerService = new AddManagerService();