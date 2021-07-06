import Prisma from '@prisma/client';

const { PrismaClient } = Prisma;

class StartService {

  constructor() { this.prismaService = new PrismaClient() }

  /**
   * 
   * @param {number} telegramId 
   * @param {string} username 
   */
  async register(telegramId, username) {
    return this.prismaService.user.create({ data: { telegramId, username } });
  }

  /**
   * 
   * @param {number} telegramId 
   */
  async isRegistered(telegramId) {
    return !!(await this.prismaService.user.findUnique({ where: { telegramId } }));
  }
  
}

export const startService = new StartService();