const { PrismaClient } = require("@prisma/client")
const { hash } = require("bcryptjs")

const prisma = new PrismaClient()

async function main() {
  const email = "globexpayru@gmail.com"
  const password = "UrmatPushka"

  // Хешируем пароль
  const hashedPassword = await hash(password, 12)

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
    })

    console.log("Администратор успешно создан:", user.email)
  } catch (error) {
    console.error("Ошибка при создании администратора:", error)
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
