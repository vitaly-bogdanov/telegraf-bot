import Prisma from '@prisma/client';

const { PrismaClient } = Prisma;

class RenameCategoryService {

  constructor() { this.prismaService = new PrismaClient() }

  async updateDescription(id, description) {
    return this.prismaService.category.update({ where: { id }, data: { description } });
  }

}

export const renameCategoryService = new RenameCategoryService();