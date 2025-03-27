import { useState, useCallback } from 'react';

export type TransactionStatus = "completed" | "pending" | "failed";
export type TransactionType = "income" | "outcome";

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  status: TransactionStatus;
  type: TransactionType;
  description: string;
}

export function useCompanyTransactions() {
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const getTransactions = useCallback(async () => {
    setIsLoading(true);
    try {
      // TODO: Implement API call
      const mockTransactions: Transaction[] = [
        {
          id: "1",
          date: "2024-01-20",
          amount: 15000,
          status: "completed",
          type: "income",
          description: "Оплата по счету #123",
        },
        {
          id: "2",
          date: "2024-01-19",
          amount: 25000,
          status: "pending",
          type: "outcome",
          description: "Перевод партнеру",
        },
      ];
      setTransactions(mockTransactions);
      return mockTransactions;
    } catch (error) {
      console.error('Error fetching transactions:', error);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []); // Мемоизируем функцию

  return {
    transactions,
    isLoading,
    getTransactions,
  };
}
