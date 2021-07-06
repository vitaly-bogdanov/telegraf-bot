import Prisma from '@prisma/client';

import { ROLE } from '../../lib/telegram/index.js';

const { PrismaClient } = Prisma;

class DeleteManagerService {
  
  constructor() { this.prismaService = new PrismaClient() }

  async destroy(id) {
    return this.prismaService.user.delete({ where: { id } });
  }

};

export const deleteManagerService = new DeleteManagerService();