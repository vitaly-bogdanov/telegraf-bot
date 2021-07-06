import Prisma from '@prisma/client';

const { PrismaClient } = Prisma;

class EditContentDescriptionService {
  
  constructor() { this.prismaService = new PrismaClient() }

  /**
   * 
   * @param {number} id - id контента, который нужно изменить
   * @param {string} description - новое значение для поля description
   */
  async updateContent(id, description) {
    return this.prismaService.content.update({ where: { id }, data: { description } })
  }

};

export const editContentDescriptionService = new EditContentDescriptionService();