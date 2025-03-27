"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcryptjs_1 = require("bcryptjs");
const prisma = new client_1.PrismaClient();
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
                password: await (0, bcryptjs_1.hash)('Aux321654987*', 12),
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
                password: await (0, bcryptjs_1.hash)('manager123', 12),
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
                password: await (0, bcryptjs_1.hash)('partner123', 12),
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
                password: await (0, bcryptjs_1.hash)('user123', 12),
                role: 'user'
            },
        });
        console.log('Тестовые пользователи успешно созданы');
    }
    catch (error) {
        console.error('Ошибка при создании пользователей:', error);
        process.exit(1);
    }
    finally {
        await prisma.$disconnect();
    }
}
main();
