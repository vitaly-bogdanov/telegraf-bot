import Prisma from '@prisma/client';

const { PrismaClient } = Prisma;

class TimeService {

  constructor() { this.prismaService = new PrismaClient() }

  /**
   * 
   * @param {number} id 
   */
  async getTime(id) {
    return this.prismaService.time.findUnique({ where: { id }, include: { schedule: { include: { user: true } }, category: true } });
  }
  
};

export const timeService = new TimeService();