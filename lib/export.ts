import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export interface Transaction {
  id: string;
  amount: number;
  type: 'income' | 'expense';
  date: Date;
  description?: string;
}

export interface TransactionData {
  date: string;
  income: number;
  expense: number;
  count: number;
}

export interface GetTransactionsParams {
  companyId: string;
  page?: number;
  limit?: number;
  startDate?: Date;
  endDate?: Date;
  type?: 'income' | 'expense';
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface TransactionsResponse {
  transactions: Transaction[];
  pagination: {
    total: number;
    page: number;
    limit: number;
  };
}

export const formatDate = (date: Date): string => {
  return format(date, 'dd MMM yyyy', { locale: ru });
};

export const formatAmount = (amount: number): string => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export function exportToExcel(data: any[], fileName: string) {
  // Преобразуем данные в CSV формат
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Форматируем значение для CSV
        if (value instanceof Date) {
          return format(value, 'dd.MM.yyyy', { locale: ru });
        }
        if (typeof value === 'number') {
          return value.toString().replace('.', ',');
        }
        if (typeof value === 'string' && value.includes(',')) {
          return `"${value}"`;
        }
        return value;
      }).join(',')
    )
  ].join('\n');

  // Создаем Blob с BOM для корректной кодировки в Excel
  const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8' });
  
  // Создаем ссылку для скачивания
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${fileName}.csv`;
  
  // Эмулируем клик для скачивания
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
