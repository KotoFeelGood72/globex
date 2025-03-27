export enum DealStatus {
  DRAFT = 'DRAFT',                     // Черновик
  PENDING_PARTNER = 'PENDING_PARTNER', // Ожидает подтверждения партнера
  PENDING_BROKER = 'PENDING_BROKER',   // Ожидает подтверждения брокера
  APPROVED = 'APPROVED',               // Одобрено
  IN_PROGRESS = 'IN_PROGRESS',         // В процессе
  COMPLETED = 'COMPLETED',             // Завершено
  REJECTED = 'REJECTED',               // Отклонено
  CANCELLED = 'CANCELLED'              // Отменено
}

export interface DealCommission {
  adminRate: number;      // Комиссия администратора (0.5%)
  brokerRate: number;     // Комиссия брокера
  partnerRate: number;    // Комиссия партнера
  systemRate: number;     // Комиссия системы
}

export interface DealParticipant {
  id: string;
  role: 'ADMIN' | 'BROKER' | 'PARTNER' | 'COMPANY';
  commission: number;     // Сумма комиссии
  profit: number;         // Прибыль
}

export interface Deal {
  id: string;
  companyId: string;
  partnerId: string;
  brokerId: string;
  
  // Основная информация
  status: DealStatus;
  createdAt: string;
  updatedAt: string;
  
  // Финансовая информация
  amount: number;
  currency: string;
  exchangeRate: number;
  exchangeSource: string;
  
  // Комиссии
  commissions: DealCommission;
  
  // Участники и их прибыль
  participants: DealParticipant[];
  
  // История изменений
  statusHistory: {
    status: DealStatus;
    timestamp: string;
    comment?: string;
  }[];
  
  // Дополнительная информация
  comments: {
    userId: string;
    role: string;
    text: string;
    timestamp: string;
  }[];
}

export enum TransferRequestType {
  TRANSFER = 'TRANSFER',   // Перевод
  GOODS = 'GOODS'         // Товарка
}

export enum TransferRequestStatus {
  DRAFT = 'DRAFT',                     // Черновик
  PENDING_PARTNER = 'PENDING_PARTNER', // Ожидает подтверждения партнера
  PENDING_BROKER = 'PENDING_BROKER',   // Ожидает подтверждения брокера
  APPROVED = 'APPROVED',               // Одобрено
  IN_PROGRESS = 'IN_PROGRESS',         // В процессе
  COMPLETED = 'COMPLETED',             // Завершено
  REJECTED = 'REJECTED',               // Отклонено
  CANCELLED = 'CANCELLED'              // Отменено
}

export interface TransferCommission {
  adminRate: number;      // Комиссия администратора (0.5%)
  brokerRate: number;     // Комиссия брокера
  partnerRate: number;    // Комиссия партнера
  systemRate: number;     // Комиссия системы
}

export interface TransferParticipant {
  id: string;
  role: 'ADMIN' | 'BROKER' | 'PARTNER' | 'COMPANY';
  commission: number;     // Сумма комиссии
  profit: number;         // Прибыль
}

export interface Invoice {
  id: string;
  filename: string;
  url: string;
  uploadedAt: string;
  size: number;
}

export interface TransferRequest {
  id: string;
  type: TransferRequestType;
  companyId: string;
  partnerId: string;
  brokerId: string;
  
  // Основная информация
  status: TransferRequestStatus;
  createdAt: string;
  updatedAt: string;
  
  // Финансовая информация
  amount: number;
  currency: string;
  exchangeRate: number;
  exchangeSource: string;
  
  // Комиссии
  commissions: TransferCommission;
  
  // Участники и их прибыль
  participants: TransferParticipant[];
  
  // История изменений
  statusHistory: {
    status: TransferRequestStatus;
    timestamp: string;
    comment?: string;
  }[];
  
  // Документы
  invoice?: Invoice;
  
  // Комментарии
  comments: {
    userId: string;
    role: string;
    text: string;
    timestamp: string;
  }[];
}

// Интерфейс для настроек брокера
export interface BrokerSettings {
  id: string;
  brokerId: string;
  exchangeRateSettings: {
    source: string;
    rates: {
      currency: string;
      rate: number;
      lastUpdate: string;
    }[];
    autoUpdate: boolean;
    updateInterval: number;
  };
  partnerCommissions: {
    partnerId: string;
    defaultRate: number;
    companyRates: {
      companyId: string;
      rate: number;
    }[];
  }[];
}

// Интерфейс для настроек партнера
export interface PartnerSettings {
  id: string;
  partnerId: string;
  defaultCommission: number;
  companyCommissions: {
    companyId: string;
    commission: number;
  }[];
}
