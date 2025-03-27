import { binanceApi, cbrApi, investingApi } from '../api/exchange-rates';

interface ExchangeRate {
  source: string;
  pair: string;
  rate: number;
  timestamp: number;
}

// Типы источников курсов
export type RateSource = 'BINANCE' | 'INVESTING' | 'CBR' | 'MANUAL';

// Интерфейс для конфигурации источника
interface RateSourceConfig {
  name: string;
  description: string;
  pairs: string[];
}

// Конфигурация источников
export const RATE_SOURCES: Record<RateSource, RateSourceConfig> = {
  BINANCE: {
    name: 'Binance',
    description: 'Курсы с биржи Binance',
    pairs: ['USDT/RUB', 'BTC/USDT', 'ETH/USDT'],
  },
  INVESTING: {
    name: 'Investing.com',
    description: 'Курсы с Investing.com',
    pairs: ['USD/RUB', 'EUR/RUB', 'CNY/RUB'],
  },
  CBR: {
    name: 'ЦБ РФ',
    description: 'Официальные курсы ЦБ РФ',
    pairs: ['USD/RUB', 'EUR/RUB', 'CNY/RUB'],
  },
  MANUAL: {
    name: 'Ручной ввод',
    description: 'Пользовательские курсы',
    pairs: ['USD/RUB', 'USDT/RUB', 'EUR/RUB'],
  },
};

// Класс для работы с курсами валют
export class ExchangeRateService {
  private static instance: ExchangeRateService;
  private rates: Map<string, ExchangeRate> = new Map();
  private subscribers: Set<(rates: Map<string, ExchangeRate>) => void> = new Set();
  private updateInterval: NodeJS.Timeout | null = null;

  private constructor() {
    this.initializeRates();
  }

  public static getInstance(): ExchangeRateService {
    if (!ExchangeRateService.instance) {
      ExchangeRateService.instance = new ExchangeRateService();
    }
    return ExchangeRateService.instance;
  }

  private async initializeRates() {
    // Инициализация начальных курсов
    await this.updateAllRates();
    
    // Запуск обновления каждую минуту
    if (this.updateInterval) {
      clearTimeout(this.updateInterval);
    }
    this.updateInterval = setTimeout(() => this.updateAllRates(), 60000);
  }

  private async updateAllRates() {
    await Promise.all([
      this.updateBinanceRates(),
      this.updateCBRRates(),
      this.updateInvestingRates()
    ]);
  }

  private async updateBinanceRates() {
    const rates = await binanceApi.getRates();
    if (rates) {
      Object.entries(rates).forEach(([pair, rate]) => {
        this.updateRate({
          source: 'BINANCE',
          pair,
          rate,
          timestamp: Date.now()
        });
      });
    }
  }

  private async updateCBRRates() {
    const rates = await cbrApi.getRates();
    if (rates) {
      Object.entries(rates).forEach(([pair, rate]) => {
        this.updateRate({
          source: 'CBR',
          pair,
          rate,
          timestamp: Date.now()
        });
      });
    }
  }

  private async updateInvestingRates() {
    const rates = await investingApi.getRates();
    if (rates) {
      Object.entries(rates).forEach(([pair, rate]) => {
        this.updateRate({
          source: 'INVESTING',
          pair,
          rate,
          timestamp: Date.now()
        });
      });
    }
  }

  private updateRate(rate: ExchangeRate) {
    const key = `${rate.source}:${rate.pair}`;
    this.rates.set(key, rate);
    this.notifySubscribers();
  }

  private notifySubscribers() {
    this.subscribers.forEach(callback => callback(this.rates));
  }

  public async getRate(source: RateSource, pair: string): Promise<number | null> {
    const key = `${source}:${pair}`;
    const rate = this.rates.get(key);
    return rate ? rate.rate : null;
  }

  public subscribe(callback: (rates: Map<string, ExchangeRate>) => void) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  public dispose() {
    if (this.updateInterval) {
      clearTimeout(this.updateInterval);
    }
    this.subscribers.clear();
    this.rates.clear();
  }
}
