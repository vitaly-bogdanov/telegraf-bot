import Prisma from '@prisma/client';

const { PrismaClient } = Prisma;

class DeleteContentService {
  
  constructor() { this.prismaService = new PrismaClient() }

  async getContent(id) {
    return this.prismaService.content.findUnique({ where: { id }, select: { description: true, categoryId: true } });
  }

  async deleteContent(id) {
    return this.prismaService.content.delete({ where: { id } });
  }

};

export const deleteContentService = new DeleteContentService();