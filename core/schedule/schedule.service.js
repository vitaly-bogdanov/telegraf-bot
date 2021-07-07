import Prisma from '@prisma/client';

const { PrismaClient } = Prisma;

class ScheduleService {

  constructor() { this.prismaService = new PrismaClient() }

  /**
   * 
   * @param {number} id 
   */
  async getSchedule(id) {
    return this.prismaService.schedule.findUnique({ where: { id }, include: { times: { include: { category: true } } } });
  }

}

export const scheduleService = new ScheduleService();