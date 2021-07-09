import Prisma from '@prisma/client';

const { PrismaClient } = Prisma;

class TimeSetCategoryService {

  constructor() { this.prismaService = new PrismaClient() }

  /**
   * 
   * @param {number} id 
   * @param {number} categoryId
   */
  async setCategory(id, categoryId) {
    return this.prismaService.time.update({ where: { id }, data: { categoryId } });
  }

  /**
   * 
   * @param {number} id 
   * @returns 
   */
  async getCurrentTimeWithCategory(id) {
    return this.prismaService.time.findUnique({ where: { id }, select: { value: true, category: true } });
  }

  /**
   * 
   * @param {number} id 
   * @returns 
   */
  async getCategories(id) {
    const categories = await this.prismaService.category.findMany();
    const times = await this.prismaService.time
      .findUnique({ where: { id }, select: { schedule: true } })
      .schedule({ select: { times: true } })
      .times({ select: { categoryId: true } });
    const ids = times.map(time => time.categoryId).filter(time => time);
    return categories.filter(category => !ids.find((id) => category.id === id));
  }
};

export const timeSetCategoryService = new TimeSetCategoryService();