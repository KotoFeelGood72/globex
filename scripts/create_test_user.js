const { PrismaClient } = require('@prisma/client');
const { hash } = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const password = await hash('Test123!', 10);
  
  const user = await prisma.user.upsert({
    where: {
      email: 'admin@globexpay.com',
    },
    update: {
      password,
      role: 'admin',
      status: 'active',
    },
    create: {
      email: 'admin@globexpay.com',
      password,
      role: 'admin',
      status: 'active',
    },
  });
  
  console.log('Created/Updated user:', user);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
