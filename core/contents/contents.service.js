import Prisma from '@prisma/client';

const { PrismaClient } = Prisma;

class ContentsService {
  constructor() { this.prismaService = new PrismaClient() }

  async getCategoryDescriptionWhithContents(id) {
    return this.prismaService.category.findUnique({ where: { id }, select: { contents: true, description: true } });
  }

}

export const contentsService = new ContentsService();