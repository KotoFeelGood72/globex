import { useState } from 'react';
import { ExchangeRate } from '@/types/calculator';

export type ExchangeRateSource = 'CBR' | 'Investing';

interface ExchangeRates {
  usdtRub?: ExchangeRate;
  fiatUsdt?: ExchangeRate;
  crossRate?: ExchangeRate;
}

export function useExchangeRates() {
  const [rates, setRates] = useState<ExchangeRates>({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchRate = async (source: ExchangeRateSource) => {
    setIsLoading(true);
    try {
      // В реальном приложении здесь будет API запрос
      const mockRates = {
        CBR: {
          usdtRub: {
            source: 'CBR',
            rate: 91.5,
            timestamp: new Date().toISOString(),
          },
          fiatUsdt: {
            source: 'CBR',
            rate: 1.01,
            timestamp: new Date().toISOString(),
          },
          crossRate: {
            source: 'CBR',
            rate: 92.415,
            timestamp: new Date().toISOString(),
          },
        },
        Investing: {
          usdtRub: {
            source: 'Investing',
            rate: 91.8,
            timestamp: new Date().toISOString(),
          },
          fiatUsdt: {
            source: 'Investing',
            rate: 1.02,
            timestamp: new Date().toISOString(),
          },
          crossRate: {
            source: 'Investing',
            rate: 93.636,
            timestamp: new Date().toISOString(),
          },
        },
      };

      setRates(mockRates[source]);
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    rates,
    fetchRate,
    isLoading,
  };
}
