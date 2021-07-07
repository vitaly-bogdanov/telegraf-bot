import Prisma from '@prisma/client';

import { ROLE } from '../../lib/telegram/index.js';

const { PrismaClient } = Prisma;

class MailingService {

  constructor() { this.prismaService = new PrismaClient() }

  async getManagers() {
    return this.prismaService.user.findMany({ where: { role: ROLE.MANAGER } });
  }

}

export const mailingService = new MailingService();