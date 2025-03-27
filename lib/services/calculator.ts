import { prisma } from "@/lib/prisma";
import { CalculationInput, CalculationResult, TariffCalculation } from "../types/calculator";

export class CalculatorService {
  static async getActiveConfig() {
    return prisma.calculatorConfig.findFirst({
      where: { isActive: true },
    });
  }

  static async calculate(input: CalculationInput): Promise<CalculationResult> {
    const config = await prisma.calculatorConfig.findUnique({
      where: { id: input.configId },
    });

    if (!config) {
      throw new Error("Calculator configuration not found");
    }

    const calculateTariff = (coefficient: number, rate: number): TariffCalculation => {
      const amount = input.baseAmount * coefficient;
      const monthlyPayment = (amount * rate) / 12;
      const quarterlyPayment = (amount * rate) / 4;
      const yearlyPayment = amount * rate;

      return {
        coefficient,
        rate,
        amount,
        monthlyPayment,
        quarterlyPayment,
        yearlyPayment,
      };
    };

    const result: CalculationResult = {
      baseAmount: input.baseAmount,
      config,
      calculations: {
        basic: calculateTariff(config.basicCoefficient, config.basicRate),
        expert: calculateTariff(config.expertCoefficient, config.expertRate),
        premium: calculateTariff(config.premiumCoefficient, config.premiumRate),
      },
      createdAt: new Date(),
    };

    // Сохраняем результат в историю
    await prisma.calculatorHistory.create({
      data: {
        configId: config.id,
        baseAmount: input.baseAmount,
        results: result,
      },
    });

    return result;
  }

  static async saveConfig(data: Omit<CalculatorConfig, "id" | "createdAt" | "updatedAt">) {
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
