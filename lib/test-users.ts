import type { UserRole } from '@prisma/client';

export interface TestUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  partnerId?: string;
  managerId?: string;
  settings?: Record<string, any>;
}

export const testUsers: TestUser[] = [
  {
    id: 'admin-1',
    email: 'admin@test.com',
    name: 'Администратор',
    role: 'admin',
    settings: {
      canViewAllRoles: true,
      canManageUsers: true,
      canManageSettings: true
    }
  },
  {
    id: 'manager-1',
    email: 'manager@test.com',
    name: 'Менеджер',
    role: 'manager',
    settings: {
      canManagePartners: true,
      canManageRates: true,
      canViewReports: true
    }
  },
  {
    id: 'partner-1',
    email: 'partner@test.com',
    name: 'Партнер',
    role: 'partner',
    managerId: 'manager-1',
    settings: {
      canManageCompanies: true,
      canViewPartnerReports: true
    }
  },
  {
    id: 'company-1',
    email: 'company@test.com',
    name: 'Компания',
    role: 'company',
    partnerId: 'partner-1',
    managerId: 'manager-1',
    settings: {
      canCreateApplications: true,
      canViewHistory: true
    }
  },
  {
    id: 'user-1',
    email: 'user@test.com',
    name: 'Пользователь',
    role: 'user',
    partnerId: 'partner-1',
    managerId: 'manager-1',
    settings: {
      canUseCalculator: true,
      canViewOwnHistory: true
    }
  }
];
