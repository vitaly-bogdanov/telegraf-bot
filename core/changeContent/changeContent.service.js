import Prisma from '@prisma/client';

const { PrismaClient } = Prisma;

class ChangeContentService {
  
  constructor() { this.prismaService = new PrismaClient() }

  async getContent(id) {
    return this.prismaService.content.findUnique({ where: { id } });
  }

};

export const changeContentService = new ChangeContentService();