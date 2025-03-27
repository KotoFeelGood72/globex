import { useState, useCallback } from 'react';

export interface Rate {
  id: string;
  name: string;
  value: number;
  minAmount: number;
  maxAmount: number;
  description?: string;
}

export function useRates() {
  const [isLoading, setIsLoading] = useState(false);
  const [rates, setRates] = useState<Rate[]>([]);

  const getRates = useCallback(async () => {
    setIsLoading(true);
    try {
      // TODO: Implement API call
      const mockRates: Rate[] = [
        {
          id: "1",
          name: "Стандартный",
          value: 2.5,
          minAmount: 1000,
          maxAmount: 100000,
          description: "Базовый тариф для всех клиентов",
        },
        {
          id: "2",
          name: "Премиум",
          value: 2.0,
          minAmount: 100000,
          maxAmount: 1000000,
          description: "Выгодный тариф для крупных сумм",
        },
        {
          id: "3",
          name: "VIP",
          value: 1.5,
          minAmount: 1000000,
          maxAmount: 10000000,
          description: "Специальные условия для VIP клиентов",
        },
      ];
      setRates(mockRates);
      return mockRates;
    } catch (error) {
      console.error('Error fetching rates:', error);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  const calculateCommission = useCallback((amount: number, rateId: string) => {
    const rate = rates.find(r => r.id === rateId);
    if (!rate) return null;

    const commission = (amount * rate.value) / 100;
    return {
      amount,
      rate,
      commission,
      total: amount + commission,
    };
  }, [rates]);

  return {
    rates,
    isLoading,
    getRates,
    calculateCommission,
  };
}
