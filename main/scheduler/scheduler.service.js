import Prisma from '@prisma/client';

import { getRandomElemetFromArray } from './sceduler.helper.js';

const { PrismaClient } = Prisma;

class ScheduleService {

  constructor() { this.prismaService = new PrismaClient() }

  /**
   * 
   * @param {number} dayNumber - 0-6, 0 - понедельник 
   * @returns 
   */
  async getSchedules(dayNumber) {
    return this.prismaService.schedule.findMany({ where: { dayNumber }, include: { times: true, user: true } });
  }

  /**
   * 
   * @param {number} categoryId 
   * @param {number} userId 
   */
  async getRandomContent(categoryId, userId) {
    const contents = await this.prismaService.content.findMany({ where: { categoryId } });
    const userTasks = await this.prismaService.task.findMany({ where: { userId }, include: { content: true } });
    const contentsIdFromUserTasks = userTasks.map(task => task.content.id);
    const filteredContent = contents.filter(content => !contentsIdFromUserTasks.find(id => content.id === id));
    const randomContent = getRandomElemetFromArray(filteredContent);
    return randomContent;
  }

  /**
   * 
   * @param {number} userId 
   * @param {number} contentId 
   */
  async createTask(userId, contentId) {
    return this.prismaService.task.create({ data: { userId, contentId } });
  }

};

export const scheduleService = new ScheduleService();