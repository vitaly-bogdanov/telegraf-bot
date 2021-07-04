import Prisma from '@prisma/client';

const { PrismaClient } = Prisma;

class СategoriesService {
  constructor() { this.prismaService = new PrismaClient() }

  async getCategories() {
    return this.prismaService.category.findMany();
  }

}

export const categoriesService = new СategoriesService();