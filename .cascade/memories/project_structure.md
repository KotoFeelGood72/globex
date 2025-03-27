# Структура проекта GOBEX

## Общее описание
GOBEX - это веб-платформа для обмена валют, предоставляющая различные инструменты для работы с курсами валют и управления транзакциями.

## Технологический стек
- **Frontend Framework**: Next.js 15.1.2
- **UI Components**: 
  - Shadcn/ui (основная система дизайна)
  - NextUI (@nextui-org/react)
  - Tailwind CSS
  - Recharts (графики)
  - Framer Motion (анимации)
- **State Management**: React Context + Hooks
- **Forms**: React Hook Form + Zod
- **Authentication**: NextAuth.js
- **Database**: PostgreSQL с Prisma ORM
- **API**: REST API с Next.js API routes

## Структура маршрутизации

### Публичные маршруты
- `/` - Главная страница (доступна всем)
- `/auth/signin` - Страница входа
- `/auth/signup` - Страница регистрации

### Административная панель (`/admin/*`)
- `/admin/dashboard` - Панель управления администратора
  - Общая статистика системы
  - График регистраций пользователей
  - Последние транзакции
  - Активность брокеров
- `/admin/users` - Управление пользователями
  - Список всех пользователей
  - Создание новых пользователей
  - Управление ролями и статусами
- `/admin/companies` - Управление компаниями
  - Список всех компаний
  - Создание и редактирование компаний
  - Просмотр транзакций компаний

### Панель брокера (`/broker/*`)
- `/broker/dashboard` - Панель управления брокера
  - Статистика по транзакциям
  - Текущие курсы валют
  - График активности
- `/broker/rates` - Управление курсами валют
  - Установка курсов валют
  - История изменений курсов
  - Автоматическое обновление

### Панель партнера (`/partner/*`)
- `/partner/dashboard` - Панель управления партнера
  - Статистика по компаниям
  - График транзакций
  - Общий оборот
- `/partner/companies` - Управление компаниями партнера
  - Список компаний партнера
  - Создание новых компаний
  - Просмотр транзакций

### Калькулятор (`/calculator`)
- Конвертация валют
- Актуальные курсы
- История конвертаций

## Роли пользователей

### Admin (Администратор)
- Полный доступ к системе
- Управление пользователями и их ролями
- Просмотр и управление всеми компаниями
- Доступ к статистике и аналитике
- Управление системными настройками

### Broker (Брокер)
- Управление курсами валют
- Просмотр и обработка транзакций
- Установка наценок и комиссий
- Доступ к калькулятору
- Просмотр статистики по транзакциям

### Partner (Партнер)
- Управление своими компаниями
- Просмотр статистики по своим компаниям
- Доступ к калькулятору
- Создание новых компаний

### User (Пользователь)
- Базовый доступ к системе
- Доступ к калькулятору
- Просмотр курсов валют
- История своих конвертаций

## API Endpoints

### Аутентификация
- `POST /api/auth/register` - Регистрация нового пользователя
- `POST /api/auth/signin` - Вход в систему
- `POST /api/auth/signout` - Выход из системы

### Администрирование
- `GET /api/admin/users` - Получение списка пользователей с пагинацией и фильтрацией
- `POST /api/admin/users` - Создание нового пользователя
- `PATCH /api/admin/users` - Обновление данных пользователя
- `GET /api/admin/stats` - Получение статистики системы

### Брокер
- `GET /api/broker/rates` - Получение текущих курсов
- `POST /api/broker/rates` - Установка новых курсов
- `GET /api/broker/transactions` - Получение списка транзакций

### Партнер
- `GET /api/partner/companies` - Получение списка компаний партнера
- `POST /api/partner/companies` - Создание новой компании
- `GET /api/partner/stats` - Получение статистики партнера

### Калькулятор
- `POST /api/calculator/calculate` - Расчет конвертации
- `GET /api/calculator/rates` - Получение актуальных курсов
- `GET /api/calculator/history` - История конвертаций пользователя

## База данных

### Основные модели

#### User
- id: UUID
- email: String (unique)
- password: String (hashed)
- name: String
- role: Enum (admin, broker, partner, user)
- status: Enum (active, inactive, pending)
- createdAt: DateTime
- updatedAt: DateTime

#### Company
- id: UUID
- name: String
- partnerId: UUID (relation to Partner)
- status: Enum (active, inactive, pending)
- createdAt: DateTime
- updatedAt: DateTime

#### Transaction
- id: UUID
- companyId: UUID (relation to Company)
- amountUsd: Decimal
- conversionRate: Decimal
- commissionAmount: Decimal
- vatAmount: Decimal
- agentCommission: Decimal
- netAmount: Decimal
- transactionDate: DateTime
- createdAt: DateTime
- updatedAt: DateTime

#### Partner
- id: UUID
- name: String
- type: Enum
- commissionRate: Decimal
- statistics: JSON
- createdAt: DateTime
- updatedAt: DateTime

## Безопасность

### Аутентификация
- NextAuth.js для управления сессиями
- Bcrypt для хеширования паролей
- JWT токены для API запросов

### Авторизация
- Middleware для проверки прав доступа
- Ролевая система доступа
- Проверка прав на уровне API и компонентов

### Защита данных
- HTTPS для всех запросов
- Валидация всех входящих данных
- Защита от CSRF атак
- Rate limiting для API endpoints
