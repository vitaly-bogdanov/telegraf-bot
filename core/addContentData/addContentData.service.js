import Prisma from '@prisma/client';

const { PrismaClient } = Prisma;

class AddContentDataService {
  constructor() { this.prismaService = new PrismaClient() }

  async createContent({ description, categoryId, data, format }) {
    return this.prismaService.content.create({ data: { description, categoryId, data, format } });
  }

}

export const addContentDataService = new AddContentDataService();