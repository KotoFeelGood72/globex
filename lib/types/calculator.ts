export type CalculatorMode = 'admin' | 'partner' | 'user';

export type CalculatorTariff = "basic" | "expert" | "premium";
export type CalculatorCurrency = "USD" | "EUR" | "CNY";

export interface CalculationAmount {
  fiat: number;
  usd: number;
}

export interface ExpectedReturn {
  monthly: number;
  quarterly: number;
  yearly: number;
}

export interface BaseCalculation {
  amount: CalculationAmount;
  contractAmount: number;
  coefficient: number;
  commission: number;
  expectedReturn: ExpectedReturn;
}

export interface AdminCalculation extends BaseCalculation {
  profitMargin: number;
  operationalCosts: number;
  riskAssessment: {
    level: "low" | "medium" | "high";
    score: number;
  };
}

export interface PartnerCalculation extends BaseCalculation {
  partnerCommission: number;
  referralBonus: number;
}

export interface UserCalculation {
  amount: {
    fiat: number;
    usd: number;
  };
  contractAmount: number;
  coefficient: number;
  commission: number;
  expectedReturn: {
    monthly: number;
    quarterly: number;
    yearly: number;
  };
  rates: {
    cbr: {
      USD: number;
      EUR: number;
      CNY: number;
    };
    investing: {
      USD: number;
      EUR: number;
      CNY: number;
      RUB: number;
    };
    crypto: {
      BTC: number;
      ETH: number;
    };
  };
}

export interface CalculatorConfig {
  id: string;
  basicCoefficient: number;
  expertCoefficient: number;
  premiumCoefficient: number;
  basicCommission: number;
  expertCommission: number;
  premiumCommission: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy?: string;
}

export interface CalculatorFormData {
  baseAmount: number;
  currency: CalculatorCurrency;
  tariff: CalculatorTariff;
}

export interface CalculationResult {
  baseAmount: number;
  currency: string;
  config: CalculatorConfig;
  calculations: {
    basic: AdminCalculation | PartnerCalculation | UserCalculation;
    expert: AdminCalculation | PartnerCalculation | UserCalculation;
    premium: AdminCalculation | PartnerCalculation | UserCalculation;
  };
  createdAt: Date;
}
