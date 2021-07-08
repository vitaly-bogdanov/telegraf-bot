import Prisma from '@prisma/client';

const { PrismaClient } = Prisma;

class TimeSetCategoryService {

  constructor() { this.prismaService = new PrismaClient() }

};

export const timeSetCategoryService = new TimeSetCategoryService();