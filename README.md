# GlobeX Pay

Платформа для управления международными платежами и конвертацией валют.

## Технологии

- Next.js 15.1.2
- React 18.2.0
- TypeScript
- Shadcn/ui
- NextUI
- Tailwind CSS
- Framer Motion
- Prisma
- NextAuth.js

## Требования

- Node.js 18.x или выше
- npm 9.x или выше
- PostgreSQL 14.x или выше

## Установка

1. Клонируйте репозиторий:
```bash
git clone [url-репозитория]
cd globex-pay
```

2. Установите зависимости:
```bash
npm install
```

3. Создайте файл `.env` и настройте переменные окружения:
```env
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="ваш-секретный-ключ"
NEXTAUTH_URL="http://localhost:4000"
```

4. Запустите миграции базы данных:
```bash
npx prisma migrate dev
```

5. Запустите проект в режиме разработки:
```bash
npm run dev
```

## Структура проекта

- `app/` - Роуты и страницы приложения
- `components/` - React компоненты
- `lib/` - Утилиты и конфигурации
- `prisma/` - Схема и миграции базы данных
- `public/` - Статические файлы
- `styles/` - Глобальные стили
- `types/` - TypeScript типы

## Лицензия

MIT