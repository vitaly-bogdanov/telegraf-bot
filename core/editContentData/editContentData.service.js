import Prisma from '@prisma/client';

const { PrismaClient } = Prisma;

class EditContentDataService {
  
  constructor() { this.prismaService = new PrismaClient() }

  /**
   * 
   * @param {number} id - id контента, который нужно изменить
   * @param {string} data - file_id или text
   * @param {string} format - новое значение для поля format
   */
  async updateContent(id, data, format) {
    return this.prismaService.content.update({ where: { id }, data: { data, format } })
  }

};

export const editContentDataService = new EditContentDataService();