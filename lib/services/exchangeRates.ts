import axios from 'axios';
import * as cheerio from 'cheerio';
import { prisma } from '@/lib/prisma';
import type { Prisma } from '@prisma/client';

export type RateSource = 'CBR' | 'INVESTING' | 'CUSTOM';

interface ExchangeRate {
  from: string;
  to: string;
  rate: number;
  source: RateSource;
  timestamp: number;
}

interface RateSettings {
  source: RateSource;
  markup: number; // наценка в процентах
  updatedAt: Date;
  updatedBy: string;
}

// Получение курсов с CBR
async function fetchCBRRates(): Promise<ExchangeRate[]> {
  try {
    const response = await axios.get('https://www.cbr.ru/currency_base/daily/');
    const $ = cheerio.load(response.data);
    const rates: ExchangeRate[] = [];
    const timestamp = Date.now();

    $('table.data tbody tr').each((_, element: cheerio.Element) => {
      const cells = $(element).find('td');
      if (cells.length >= 5) {
        const code = $(cells[1]).text().trim();
        const nominal = parseFloat($(cells[2]).text().replace(',', '.'));
        const value = parseFloat($(cells[4]).text().replace(',', '.'));

        if (!isNaN(nominal) && !isNaN(value) && code) {
          rates.push({
            from: code,
            to: 'RUB',
            rate: value / nominal,
            source: 'CBR',
            timestamp
          });
        }
      }
    });

    return rates;
  } catch (error) {
    console.error('Ошибка при получении курсов ЦБ РФ:', error);
    throw error;
  }
}

// Получение курсов с Investing.com
async function fetchInvestingRates(pairs: string[]): Promise<ExchangeRate[]> {
  try {
    const rates: ExchangeRate[] = [];
    const timestamp = Date.now();

    for (const pair of pairs) {
      const [from, to] = pair.split('/');
      const url = `https://ru.investing.com/currencies/${from.toLowerCase()}-${to.toLowerCase()}`;
      
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });

      const $ = cheerio.load(response.data);
      const rateText = $('.text-2xl').first().text();
      const rate = parseFloat(rateText.replace(',', '.'));

      if (!isNaN(rate)) {
        rates.push({
          from,
          to,
          rate,
          source: 'INVESTING',
          timestamp
        });
      }
    }

    return rates;
  } catch (error) {
    console.error('Ошибка при получении курсов с Investing.com:', error);
    throw error;
  }
}

// Получение настроек курсов для менеджера
async function getManagerRateSettings(managerId: string) {
  const settings = await prisma.rateSettings.findFirst({
    where: { managerId }
  });

  return settings || {
    source: 'CBR' as RateSource,
    markup: 0,
    updatedAt: new Date(),
    updatedBy: managerId
  };
}

// Обновление настроек курсов
export async function updateManagerRateSettings(
  managerId: string,
  settings: Omit<RateSettings, 'updatedAt'>
) {
  const updated = await prisma.rateSettings.upsert({
    where: { managerId },
    update: {
      ...settings,
      updatedAt: new Date()
    },
    create: {
      ...settings,
      managerId,
      updatedAt: new Date()
    }
  });

  // Обновление кэша курсов
  await invalidateRatesCache(managerId);

  // Уведомление зависимых пользователей
  await notifyDependentUsers(managerId, { ...settings, updatedAt: new Date() });

  return updated;
}

// Получение актуальных курсов с учетом настроек менеджера
export async function getExchangeRates(
  managerId: string,
  pairs: string[]
): Promise<ExchangeRate[]> {
  try {
    // Получение настроек менеджера
    const settings = await getManagerRateSettings(managerId);

    // Получение базовых курсов
    let rates: ExchangeRate[];
    switch (settings.source) {
      case 'CBR':
        rates = await fetchCBRRates();
        break;
      case 'INVESTING':
        rates = await fetchInvestingRates(pairs);
        break;
      case 'CUSTOM':
        rates = await getCustomRates(managerId);
        break;
      default:
        throw new Error('Неизвестный источник курсов');
    }

    // Применение наценки
    if (settings.markup !== 0) {
      rates = rates.map(rate => ({
        ...rate,
        rate: rate.rate * (1 + settings.markup / 100)
      }));
    }

    // Кэширование результатов
    await cacheRates(managerId, rates);

    return rates;
  } catch (error) {
    console.error('Ошибка при получении курсов валют:', error);
    throw error;
  }
}

// Получение пользовательских курсов
async function getCustomRates(managerId: string): Promise<ExchangeRate[]> {
  const customRates = await prisma.customRate.findMany({
    where: { managerId }
  });

  return customRates.map(rate => ({
    from: rate.fromCurrency,
    to: rate.toCurrency,
    rate: Number(rate.rate),
    source: 'CUSTOM' as RateSource,
    timestamp: rate.updatedAt.getTime()
  }));
}

// Кэширование курсов
async function cacheRates(managerId: string, rates: ExchangeRate[]) {
  await prisma.rateCache.upsert({
    where: { managerId },
    update: {
      rates: rates as unknown as Prisma.JsonValue,
      updatedAt: new Date()
    },
    create: {
      managerId,
      rates: rates as unknown as Prisma.JsonValue,
      updatedAt: new Date()
    }
  });
}

// Инвалидация кэша
async function invalidateRatesCache(managerId: string) {
  await prisma.rateCache.deleteMany({
    where: { managerId }
  });
}

// Уведомление зависимых пользователей
async function notifyDependentUsers(managerId: string, settings: RateSettings) {
  // Получение всех зависимых пользователей
  const dependentUsers = await prisma.user.findMany({
    where: {
      OR: [
        { managerId },
        {
          partner: {
            managerId
          }
        }
      ] as Prisma.UserWhereInput[]
    }
  });

  // Создание уведомлений
  const notifications = dependentUsers.map(user => ({
    userId: user.id,
    type: 'RATE_UPDATE',
    title: 'Обновление курсов валют',
    message: `Менеджер обновил настройки курсов валют. Источник: ${settings.source}, наценка: ${settings.markup}%`,
    data: settings as unknown as Prisma.JsonValue,
    createdAt: new Date()
  }));

  // Сохранение уведомлений
  await prisma.notification.createMany({
    data: notifications
  });
}

// Форматирование расчета для отображения
export function formatCalculation(
  amount: number,
  rate: ExchangeRate,
  settings: RateSettings
) {
  const baseAmount = amount;
  const baseRate = rate.rate / (1 + settings.markup / 100);
  const markup = rate.rate - baseRate;
  const convertedAmount = amount * rate.rate;

  return {
    summary: `${amount} ${rate.from} = ${convertedAmount.toFixed(2)} ${rate.to}`,
    details: [
      `Базовая сумма: ${baseAmount} ${rate.from}`,
      `Базовый курс (${rate.source}): ${baseRate.toFixed(4)}`,
      `Наценка (${settings.markup}%): ${markup.toFixed(4)}`,
      `Итоговый курс: ${rate.rate.toFixed(4)}`,
      `Итоговая сумма: ${convertedAmount.toFixed(2)} ${rate.to}`,
      `Обновлено: ${new Date(rate.timestamp).toLocaleString()}`,
      `Источник: ${rate.source}`
    ].join('\n')
  };
}
