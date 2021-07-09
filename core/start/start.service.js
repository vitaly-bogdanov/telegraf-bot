import Prisma from '@prisma/client';

import { TASK_STATUS } from '../../main/scheduler/index.js';
import { getRandomElemetFromArray } from '../../lib/telegram/index.js';
import { isHashComparedHelper } from '../../lib/bcrypt/index.js';

const { PrismaClient } = Prisma;

class StartService {

  constructor() { this.prismaService = new PrismaClient() };

  /**
   * 
   * @param {number} telegramId 
   * @param {string} username 
   */
  async register(telegramId, username) {
    return this.prismaService.user.create({ data: { telegramId, username } });
  };

  /**
   * 
   * @param {number} telegramId 
   */
  async isRegistered(telegramId) {
    return !!(await this.prismaService.user.findUnique({ where: { telegramId } }));
  };

  /**
   * 
   * @param {number} telegramId 
   */
  async getTasks(telegramId) {
    const user = await this.prismaService.user.findUnique({ where: { telegramId }, include: { tasks: { where: { status: TASK_STATUS.IN_PROGRESS }, include: { content: true } } } });
    return user.tasks;
  };
  
  /**
   * 
   * @param {number} id 
   * @returns 
   */
  async setTaskComplete(id) {
    return this.prismaService.task.update({ where: { id }, data: { status: TASK_STATUS.COMPLETE } });
  }

  /**
   * 
   * @param {number} id 
   * @returns 
   */
  async getRandomContentTask(id) {
    const task = await this.prismaService.task.findUnique({ where: { id }, include: { content: true } });
    const category = await this.prismaService.category.findUnique({ where: { id: task.content.categoryId }, include: { contents: true } });
    const taskWhithUserContent = await this.prismaService.task.findUnique({ where: { id: task.id }, include: { user: { select: { tasks: { select: { content: { select: { id: true } } } } } } } });
    const ids = taskWhithUserContent.user.tasks.map(task => task.content.id);
    const filteredContent = category.contents.filter(content => !ids.find(id => id === content.id));
    const random = getRandomElemetFromArray(filteredContent);
    if (random) {
      return this.prismaService.task.update({ where: { id }, data: { contentId: random.id } });
    }
  }

  /**
   * 
   * @param {number} telegramId 
   */
  async getCurrentUser(telegramId) {
    return this.prismaService.user.findUnique({ where: { telegramId }, select: { id: true, username: true, telegramId: true, role: true } });
  }

  async passwordValidate(id, password) {
    const user = await this.prismaService.user.findUnique({ where: { id }, select: { password: true } });
    return isHashComparedHelper(password, user.password);
  }

}

export const startService = new StartService();