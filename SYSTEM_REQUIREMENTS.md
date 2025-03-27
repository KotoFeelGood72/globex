# Administrative Dashboard System Requirements

## System Architecture

### Technology Stack
- **Frontend**: Next.js 15.1.2
- **UI Framework**: 
  - Shadcn/ui (основная система дизайна)
  - NextUI v2
- **Styling**: TailwindCSS
- **State Management**: React Context + Hooks
- **Authentication**: NextAuth.js
- **Database**: PostgreSQL with Prisma ORM
- **Charts**: Recharts
- **Animations**: Framer Motion

### Core Features
1. **Authentication System**
   - JWT-based authentication
   - Role-based access control (admin, broker, partner, user)
   - Session management
   - Password encryption with bcrypt

2. **Data Models**

```typescript
// User Model
interface User {
  id: string;
  email: string;
  password: string;
  name?: string;
  role: "admin" | "broker" | "partner" | "user";
  status: "active" | "inactive" | "pending";
  createdAt: Date;
  updatedAt: Date;
}

// Partner Model
interface Partner {
  id: string;
  name: string;
  type: "broker" | "partner";
  commissionRate: number;
  statistics: Record<string, any>;
  companies: Company[];
  createdAt: Date;
  updatedAt: Date;
}

// Company Model
interface Company {
  id: string;
  name: string;
  partnerId: string;
  status: "active" | "inactive" | "pending";
  transactions: Transaction[];
  createdAt: Date;
  updatedAt: Date;
}

// Transaction Model
interface Transaction {
  id: string;
  companyId: string;
  amountUsd: number;
  conversionRate: number;
  commissionAmount: number;
  vatAmount: number;
  agentCommission: number;
  netAmount: number;
  transactionDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

## Application Structure

### 1. Layout Components
```typescript
interface LayoutProps {
  children: React.ReactNode;
  showNavigation?: boolean;
  showFooter?: boolean;
}
```

### 2. Navigation Structure
- Панель администратора (/admin/*)
  - Dashboard (/admin/dashboard)
  - Пользователи (/admin/users)
  - Компании (/admin/companies)
  - Статистика (/admin/stats)
- Панель брокера (/broker/*)
  - Dashboard (/broker/dashboard)
  - Курсы валют (/broker/rates)
  - Транзакции (/broker/transactions)
- Панель партнера (/partner/*)
  - Dashboard (/partner/dashboard)
  - Компании (/partner/companies)
- Калькулятор (/calculator)

### 3. Page-Specific Requirements

#### Панель администратора
- **Компоненты**:
  - Карточки статистики
  - Лента активности
  - Графики обзора
- **Требования к данным**:
  - Общее количество пользователей
  - Статистика по ролям
  - График регистраций
  - Последние транзакции

#### Управление пользователями
- **Функциональность**:
  - Создание новых пользователей
  - Управление ролями
  - Изменение статуса
  - Просмотр активности
- **Фильтрация и поиск**:
  - По роли
  - По статусу
  - По дате регистрации
  - По email/имени

#### Управление компаниями
- **Основные функции**:
  - Создание компаний
  - Привязка к партнерам
  - Управление статусом
  - Просмотр транзакций
- **Данные компании**:
  - Основная информация
  - Статистика транзакций
  - История изменений

#### Калькулятор
- **Функциональность**:
  - Конвертация валют
  - Расчет комиссий
  - История операций
- **Интеграции**:
  - API курсов валют
  - Система комиссий
  - Сохранение истории

## API Endpoints

### Аутентификация
```typescript
POST /api/auth/register
{
  email: string;
  password: string;
  name?: string;
  role?: UserRole;
}

POST /api/auth/signin
{
  email: string;
  password: string;
}
```

### Управление пользователями
```typescript
GET /api/admin/users
Query: {
  page?: number;
  limit?: number;
  role?: UserRole;
  status?: UserStatus;
  search?: string;
}

POST /api/admin/users
{
  email: string;
  password: string;
  name?: string;
  role: UserRole;
  status?: UserStatus;
}

PATCH /api/admin/users
{
  id: string;
  role?: UserRole;
  status?: UserStatus;
  name?: string;
}
```

### Управление компаниями
```typescript
GET /api/admin/companies
Query: {
  page?: number;
  limit?: number;
  partnerId?: string;
  status?: CompanyStatus;
}

POST /api/admin/companies
{
  name: string;
  partnerId: string;
  status?: CompanyStatus;
}
```

### Транзакции
```typescript
GET /api/transactions
Query: {
  companyId?: string;
  startDate?: Date;
  endDate?: Date;
  page?: number;
  limit?: number;
}

POST /api/transactions
{
  companyId: string;
  amountUsd: number;
  conversionRate: number;
  transactionDate?: Date;
}
```

## Security Requirements

### Authentication & Authorization
- Secure password hashing (bcrypt)
- JWT token management
- Role-based access control
- Session timeout handling

### Data Protection
- HTTPS enforcement
- Input validation
- XSS protection
- CSRF protection
- Rate limiting

## Performance Requirements

### Loading Times
- Page initial load: < 2s
- API responses: < 500ms
- Chart rendering: < 1s

### Optimization
- Image optimization
- Code splitting
- Lazy loading
- Caching strategies

## Browser Support
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## Mobile Responsiveness
- Breakpoints: 
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px
  - 2xl: 1536px

## Error Handling
- Custom error pages
- Error logging
- User-friendly error messages
- Graceful degradation
