import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Очищаем базу данных
  await prisma.transaction.deleteMany();
  await prisma.broker.deleteMany();
  await prisma.company.deleteMany();
  await prisma.partner.deleteMany();
  await prisma.user.deleteMany();

  // Создаем администратора
  const adminPassword = await hash('admin123', 10);
  await prisma.user.create({
    data: {
      email: 'admin@globex.com',
      password: adminPassword,
      name: 'Администратор',
      phone: '+7 (999) 999-99-99',
      role: 'admin'
    }
  });

  // Создаем брокера
  const brokerPassword = await hash('broker123', 10);
  await prisma.user.create({
    data: {
      email: 'broker@globex.com',
      password: brokerPassword,
      name: 'Иван Брокеров',
      phone: '+7 (999) 888-88-88',
      role: 'broker',
      broker: {
        create: {
          commissionRate: 0.5
        }
      }
    }
  });

  // Создаем партнера
  const partnerPassword = await hash('partner123', 10);
  const partnerUser = await prisma.user.create({
    data: {
      email: 'partner@globex.com',
      password: partnerPassword,
      name: 'Петр Партнеров',
      phone: '+7 (999) 777-77-77',
      role: 'partner',
      partner: {
        create: {
          commissionRate: 0.3
        }
      }
    },
    include: {
      partner: true
    }
  });

  if (!partnerUser.partner) {
    throw new Error('Failed to create partner');
  }

  // Создаем компанию
  const companyPassword = await hash('company123', 10);
  await prisma.user.create({
    data: {
      email: 'company@globex.com',
      password: companyPassword,
      name: 'ООО "Тестовая Компания"',
      phone: '+7 (999) 666-66-66',
      role: 'company',
      company: {
        create: {
          balance: 10000,
          partnerId: partnerUser.partner.id
        }
      }
    }
  });

  console.log('База данных заполнена тестовыми данными');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
