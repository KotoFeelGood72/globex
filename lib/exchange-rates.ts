import { create } from 'zustand';

// Типы для курсов валют
export interface ExchangeRate {
  name: string;
  rate: number;
  lastUpdated: Date;
}

export interface ExchangeRates {
  [key: string]: ExchangeRate;
}

interface ExchangeRatesState {
  rates: ExchangeRates;
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  updateRates: () => Promise<void>;
}

// Значения по умолчанию (fallback)
const defaultRates: ExchangeRates = {
  USD: { name: 'US Dollar', rate: 100.69, lastUpdated: new Date() },
  EUR: { name: 'Euro', rate: 105.65, lastUpdated: new Date() },
  RUB: { name: 'Russian Ruble', rate: 1, lastUpdated: new Date() },
  CNY: { name: 'Chinese Yuan', rate: 13.89, lastUpdated: new Date() },
};

// Маппинг названий валют
const currencyNames: { [key: string]: string } = {
  USD: 'US Dollar',
  EUR: 'Euro',
  RUB: 'Russian Ruble',
  CNY: 'Chinese Yuan',
};

interface RoyalRateResponse {
  leftCurrency: string;
  rightCurrency: string;
  rate: string;
}

let lastFetchTime = 0;
const REFRESH_INTERVAL = 60000; // 1 минута

// Функция для получения курсов через API
async function fetchRoyalRates(): Promise<ExchangeRates> {
  try {
    // Проверяем, прошла ли минута с последнего запроса
    const now = Date.now();
    if (now - lastFetchTime < REFRESH_INTERVAL) {
      return useExchangeRates.getState().rates;
    }

    const response = await fetch('/api/exchange-rates', {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch rates');
    }

    const data = await response.json() as RoyalRateResponse[];
    lastFetchTime = now;
    
    if (Array.isArray(data) && data.length > 0) {
      const currentTime = new Date();
      const rates: ExchangeRates = {
        RUB: { name: 'Russian Ruble', rate: 1, lastUpdated: currentTime },
      };
      
      // Обрабатываем каждую валютную пару
      data.forEach(({ leftCurrency, rightCurrency, rate }) => {
        // Нас интересуют только пары с RUB
        if (rightCurrency === 'RUB') {
          const rateValue = Number(parseFloat(rate).toFixed(4));
          rates[leftCurrency] = {
            name: currencyNames[leftCurrency] || leftCurrency,
            rate: rateValue,
            lastUpdated: currentTime
          };
        }
      });

      if (Object.keys(rates).length > 1) { // Больше чем просто RUB
        return rates;
      }
    }
    
    console.warn('Using default rates due to invalid API response');
    return defaultRates;
    
  } catch (error) {
    console.error('Error fetching rates:', error);
    return defaultRates;
  }
}

// Создаем store с помощью zustand
export const useExchangeRates = create<ExchangeRatesState>((set) => ({
  rates: defaultRates,
  isLoading: false,
  error: null,
  lastUpdated: null,
  updateRates: async () => {
    set({ isLoading: true, error: null });
    try {
      const newRates = await fetchRoyalRates();
      set({
        rates: newRates,
        lastUpdated: new Date(),
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to update rates',
        isLoading: false,
      });
    }
  },
}));

// Инициализация обновления курсов
export function initRatesUpdate() {
  // Первое обновление
  useExchangeRates.getState().updateRates();
  
  // Периодическое обновление
  setInterval(() => {
    useExchangeRates.getState().updateRates();
  }, REFRESH_INTERVAL);
}
