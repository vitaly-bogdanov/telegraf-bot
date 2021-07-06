import Prisma from '@prisma/client';

const { PrismaClient } = Prisma;

class DeleteСategoryService {
  
  constructor() { this.prismaService = new PrismaClient() }

  async getCategoryDescription(id) {
    const category = await this.prismaService.category.findUnique({ where: { id }, select: { description: true }});
    return category.description;
  }

  async getContentCountByCategoryId(categoryId) {
    return this.prismaService.content.count({ where: { categoryId } });
  }

  async deleteCategoryWhithAllContent(id) {
    return this.prismaService.category.delete({ where: { id } });
  }
}

export const deleteСategoryService = new DeleteСategoryService();