"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcryptjs_1 = require("bcryptjs");
const prisma = new client_1.PrismaClient();
async function main() {
    const password = await (0, bcryptjs_1.hash)('Test123!', 10);
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
