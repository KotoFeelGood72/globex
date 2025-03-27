import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  try {
    // Создаем администратора
    await prisma.user.upsert({
      where: { email: 'urmatdigital@gmail.com' },
      update: {
        role: 'admin'
      },
      create: {
        email: 'urmatdigital@gmail.com',
        name: 'Администратор',
        password: await hash('Aux321654987*', 12),
        role: 'admin'
      },
    });

    // Создаем тестового менеджера
    await prisma.user.upsert({
      where: { email: 'manager@test.com' },
      update: {},
      create: {
        email: 'manager@test.com',
        name: 'Тестовый менеджер',
        password: await hash('manager123', 12),
        role: 'manager'
      },
    });

    // Создаем тестового партнера
    await prisma.user.upsert({
      where: { email: 'partner@test.com' },
      update: {},
      create: {
        email: 'partner@test.com',
        name: 'Тестовый партнер',
        password: await hash('partner123', 12),
        role: 'partner'
      },
    });

    // Создаем тестового пользователя
    await prisma.user.upsert({
      where: { email: 'user@test.com' },
      update: {},
      create: {
        email: 'user@test.com',
        name: 'Тестовый пользователь',
        password: await hash('user123', 12),
        role: 'user'
      },
    });

    console.log('Тестовые пользователи успешно созданы');
  } catch (error) {
    console.error('Ошибка при создании пользователей:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
