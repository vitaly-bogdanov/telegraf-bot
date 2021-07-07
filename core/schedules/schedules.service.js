import Prisma from '@prisma/client';

const { PrismaClient } = Prisma;

class SchedulesService {

  constructor() { this.prismaService = new PrismaClient() }

  async getManager(id) {
    return this.prismaService.user.findUnique({ where: { id }, select: { telegramId: true, username: true, schedules: true } });
  }

}

export const schedulesService = new SchedulesService();