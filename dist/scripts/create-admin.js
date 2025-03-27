"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcryptjs_1 = require("bcryptjs");
const prisma = new client_1.PrismaClient();
async function main() {
    const email = "globexpayru@gmail.com";
    const password = "UrmatPushka";
    // Хешируем пароль
    const hashedPassword = await (0, bcryptjs_1.hash)(password, 12);
    try {
        const user = await prisma.user.upsert({
            where: { email },
            update: {
                password: hashedPassword,
                role: "ADMIN"
            },
            create: {
                email,
                password: hashedPassword,
                role: "ADMIN",
                name: "Admin"
            }
        });
        console.log("Администратор успешно создан:", user.email);
    }
    catch (error) {
        console.error("Ошибка при создании администратора:", error);
    }
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
