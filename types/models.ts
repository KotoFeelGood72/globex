import type { Prisma } from '@prisma/client';

export type UserRole = 'ADMIN' | 'BROKER' | 'PARTNER' | 'COMPANY';
export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'PENDING';
export type TransactionStatus = 'PENDING' | 'COMPLETED' | 'FAILED';

// Базовые типы для создания и обновления
export type UserCreateData = Prisma.UserCreateInput;
export type UserUpdateData = Prisma.UserUpdateInput;

// Тип для пользователя с ролью брокера
export type UserBrokerInclude = {
  broker: {
    include: {
      transactions: {
        include: {
          company: true;
        };
        orderBy: {
          transactionDate: 'desc';
        };
      };
    };
  };
};

// Типы для Transaction с включенными связями
export type TransactionInclude = {
  company: true;
  broker: {
    include: {
      user: true;
    };
  };
};

// Типы для Company с включенными связями
export type CompanyInclude = {
  transactions: true;
};

// Типы для Partner с включенными связями
export type PartnerInclude = {
  companies: true;
};

// Типы для API запросов
export type CreateBrokerRequest = {
  email: string;
  password: string;
  name: string;
  phone?: string;
  commissionRate?: number;
};
