import faker from 'faker';

import Prisma from "@prisma/client";

faker.locale = "ru";

const { PrismaClient } = Prisma;

const prisma = new PrismaClient();

const initialTimeValues = [
  { value: '10:00-11:25' },
  { value: '10:00-11:25' },
  { value: '14:00-15:00' },
  { value: '16:00-17:00' },
  { value: '18:00-19:00' },
  { value: '20:00-21:00' },
  { value: '22:00-23:00' }
];

const initialData = Array.from(Array(10).keys()).map(() => ({ 
  description: faker.lorem.sentence(), 
  contents: { create: Array.from(Array(10).keys()).map(() => ({ description: faker.lorem.sentence(), data: faker.lorem.sentence(), format: 'text' })) } 
}));

export async function main() {

  await prisma.user.create({ data: { username: 'kaliummati', telegramId: 357594609, role: 'manager', schedules: {
    create: [
      { dayNumber: 1, dayName: 'Понедельник', times: { create: initialTimeValues } },
      { dayNumber: 2, dayName: 'Вторник', times: { create: initialTimeValues } },
      { dayNumber: 3, dayName: 'Среда', times: { create: initialTimeValues } },
      { dayNumber: 4, dayName: 'Четверг', times: { create: initialTimeValues } },
      { dayNumber: 5, dayName: 'Пятница', times: { create: initialTimeValues } },
      { dayNumber: 6, dayName: 'Суббота', times: { create: initialTimeValues } },
      { dayNumber: 0, dayName: 'Воскресенье', times: { create: initialTimeValues } }
    ] }}
  });

  await prisma.user.create({ data: { username: 'coldbrew1337', telegramId: 1220189940, role: 'manager', schedules: {
    create: [
      { dayNumber: 1, dayName: 'Понедельник', times: { create: initialTimeValues } },
      { dayNumber: 2, dayName: 'Вторник', times: { create: initialTimeValues } },
      { dayNumber: 3, dayName: 'Среда', times: { create: initialTimeValues } },
      { dayNumber: 4, dayName: 'Четверг', times: { create: initialTimeValues } },
      { dayNumber: 5, dayName: 'Пятница', times: { create: initialTimeValues } },
      { dayNumber: 6, dayName: 'Суббота', times: { create: initialTimeValues } },
      { dayNumber: 0, dayName: 'Воскресенье', times: { create: initialTimeValues } }
    ] }}
  });

  for (let data of initialData) {
    await prisma.category.create({ data });
  }

  const users = await prisma.user.findMany();
  const contents = await prisma.content.findMany();

  for (let user of users) {
    for (let content of contents) {
      await prisma.task.create({ data: { contentId: content.id, userId: user.id, status: "in progress" }, include: { content: true } });
    }
  }

  const times = await prisma.time.findMany();

  const category = await prisma.category.findFirst();

  for (let time of times) {
    await prisma.time.update({ where: { id: time.id }, data: { categoryId:  category.id } })
  }

}

main().catch((e) => console.log(e)).finally(() => prisma.$disconnect());