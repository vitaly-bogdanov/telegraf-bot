import Prisma from '@prisma/client';

import { getHashHelper } from '../../lib/bcrypt/index.js';
import { ROLE } from '../../lib/telegram/index.js';

const { PrismaClient } = Prisma;

class CliService {
  constructor() { this.prismaService = new PrismaClient() }

  async setAdminRole(telegramId, password) {
    const hashPassword = getHashHelper(password);
    return this.prismaService.user.update({ where: { telegramId }, data: { password: hashPassword, role: ROLE.ADMIN } });
  }

}

export const cliService = new CliService();