import prisma from "@/lib/prisma";
import {
  DetailedCalculationResult,
  CalculationRequest as CalculationInput,
  PartnerSettings,
  Coefficients,
} from "../types/calculator";

interface ConversionRates {
  USD_FIAT: number;
  EUR_FIAT: number;
  CNY_FIAT: number;
}

interface AdminCalculation {
  commission: number;
  amount: {
    fiat: number;
    usd: number;
  };
  totalAmount: number;
  internalCommissions: {
    agent1: number;
    agent2: number;
    royal: number;
  };
  profitDistribution: {
    company: number;
    partners: number;
    platform: number;
  };
}

interface PartnerCalculation {
  commission: number;
  amount: {
    fiat: number;
    usd: number;
  };
  totalAmount: number;
  partnerRewards: {
    direct: number;
    royal: number;
  };
}

interface UserCalculation {
  commission: number;
  amount: {
    fiat: number;
    usd: number;
  };
  totalAmount: number;
  returns: {
    monthly: number;
    quarterly: number;
    yearly: number;
  };
}

export class CalculatorService {
  private static async getConversionRates(): Promise<ConversionRates> {
    // В реальном приложении здесь будет запрос к API для получения актуальных курсов
    return {
      USD_FIAT: 97.41,
      EUR_FIAT: 106.32,
      CNY_FIAT: 13.72,
    };
  }

  static async adminCalculate(input: CalculationInput): Promise<AdminCalculation> {
    const config = await prisma.calculatorConfig.findFirst({
      where: { isActive: true },
    });

    if (!config) {
      throw new Error("Активная конфигурация не найдена");
    }

    const rates = await this.getConversionRates();
    const rate = rates[`${input.currency}_FIAT` as keyof ConversionRates];
    
    // Базовые расчеты
    const fiatAmount = input.baseAmount;
    const usdAmount = fiatAmount * rate;
    
    // Фиксированная комиссия 3%
    const totalCommission = usdAmount * 0.03;
    const netAmount = usdAmount - totalCommission;
    
    // Расчет вознаграждений агентов (скрыто от пользователя)
    const agent1Commission = (netAmount * 0.5) / 100;
    const agent2Commission = (netAmount * 0.3) / 100;
    const royalCommission = (netAmount * 0.2) / 100;
    
    // Распределение прибыли
    const companyProfit = netAmount * 0.7;
    const partnersProfit = netAmount * 0.2;
    const platformProfit = netAmount * 0.1;

    const result: AdminCalculation = {
      commission: 3, // Показываем только процент комиссии
      amount: {
        fiat: fiatAmount,
        usd: usdAmount,
      },
      totalAmount: netAmount,
      internalCommissions: {
        agent1: agent1Commission,
        agent2: agent2Commission,
        royal: royalCommission,
      },
      profitDistribution: {
        company: companyProfit,
        partners: partnersProfit,
        platform: platformProfit,
      },
    };

    // Сохраняем результат в историю
    await prisma.calculatorHistory.create({
      data: {
        configId: config.id,
        baseAmount: fiatAmount,
        results: result,
      },
    });

    return result;
  }

  static async partnerCalculate(input: CalculationInput): Promise<PartnerCalculation> {
    const config = await prisma.calculatorConfig.findFirst({
      where: { isActive: true },
    });

    if (!config) {
      throw new Error("Активная конфигурация не найдена");
    }

    const rates = await this.getConversionRates();
    const rate = rates[`${input.currency}_FIAT` as keyof ConversionRates];
    
    const fiatAmount = input.baseAmount;
    const usdAmount = fiatAmount * rate;
    
    // Фиксированная комиссия 3%
    const totalCommission = usdAmount * 0.03;
    const netAmount = usdAmount - totalCommission;
    
    // Расчет вознаграждений для партнера
    const partnerReward = (netAmount * 0.5) / 100;
    const royalReward = (netAmount * 0.2) / 100;

    const result: PartnerCalculation = {
      commission: 3, // Показываем только процент комиссии
      amount: {
        fiat: fiatAmount,
        usd: usdAmount,
      },
      totalAmount: netAmount,
      partnerRewards: {
        direct: partnerReward,
        royal: royalReward,
      },
    };

    return result;
  }

  static async userCalculate(input: CalculationInput): Promise<UserCalculation> {
    const config = await prisma.calculatorConfig.findFirst({
      where: { isActive: true },
    });

    if (!config) {
      throw new Error("Активная конфигурация не найдена");
    }

    const rates = await this.getConversionRates();
    const rate = rates[`${input.currency}_FIAT` as keyof ConversionRates];
    
    const fiatAmount = input.baseAmount;
    const usdAmount = fiatAmount * rate;
    
    // Фиксированная комиссия 3%
    const totalCommission = usdAmount * 0.03;
    const netAmount = usdAmount - totalCommission;
    
    // Расчет ожидаемой доходности
    const monthlyReturn = netAmount * 0.1 / 12;
    const quarterlyReturn = monthlyReturn * 3;
    const yearlyReturn = monthlyReturn * 12;

    const result: UserCalculation = {
      commission: 3, // Показываем только процент комиссии
      amount: {
        fiat: fiatAmount,
        usd: usdAmount,
      },
      totalAmount: netAmount,
      returns: {
        monthly: monthlyReturn,
        quarterly: quarterlyReturn,
        yearly: yearlyReturn,
      },
    };

    return result;
  }

  static async saveConfig(data: Partial<PartnerSettings>) {
    // Деактивируем текущую активную конфигурацию
    if (data.isActive) {
      await prisma.calculatorConfig.updateMany({
        where: { isActive: true },
        data: { isActive: false },
      });
    }

    return prisma.calculatorConfig.create({
      data,
    });
  }
}
