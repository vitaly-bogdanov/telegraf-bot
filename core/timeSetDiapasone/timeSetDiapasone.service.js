import Prisma from '@prisma/client';

const { PrismaClient } = Prisma;

class TimeSetDiapasoneService {

  constructor() { this.prismaService = new PrismaClient() }

  /**
   * 
   * @param {number} id 
   * @param {string} value - format 12:00-13:54 
   * @returns 
   */
  async setDiapsone(id, value) {
    return this.prismaService.time.update({ where: { id }, data: { value } });
  }

  /**
   * 
   * @param {number} id 
   * @returns 
   */
  async getTime(id) {
    return this.prismaService.time.findUnique({ where: { id } });
  }

};

export const timeSetDiapasoneService = new TimeSetDiapasoneService();