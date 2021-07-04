import Prisma from '@prisma/client';

import { getHashHelper } from '../../lib/bcrypt/index.js';

const { PrismaClient } = Prisma;

class AddCategoryService {
  constructor() { this.prismaService = new PrismaClient() }

  async createCategory(description) {
    return this.prismaService.category.create({ data: { description } });
  }

}

export const addCategoryService = new AddCategoryService();