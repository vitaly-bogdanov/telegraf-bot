import Prisma from '@prisma/client';

import { ROLE } from '../../lib/telegram/index.js';

const { PrismaClient } = Prisma;

class AddManagerService {
  
  constructor() { this.prismaService = new PrismaClient() }

  async setManagerRole(telegramId) {
    return this.prismaService.user.update({ where: { telegramId }, data: { role: ROLE.MANAGER } });
  }

  async isUserExist(telegramId) {
    return !!(this.prismaService.user.findUnique({ where: { telegramId } }));
  }

}

export const addManagerService = new AddManagerService();