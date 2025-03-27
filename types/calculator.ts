export type UserRole = 'admin' | 'manager' | 'partner' | 'company' | 'user';

export interface CommissionRates {
  base: number;
  vat: number;
  agent: number;
  partner: number;
  manager: number;
}

export type RequestStatus = 'pending' | 'accepted' | 'rejected' | 'completed' | 'draft';

export interface CalculationRequest {
  id: string;
  createdAt: Date;
  status: RequestStatus;
  amount: number;
  company: {
    id: string;
    name: string;
  };
  broker: {
    id: string;
    name: string;
  };
}

export interface CalculationResult {
  // Суммы
  originalAmount: number;
  convertedAmount: number;
  netAmount: number;
  
  // Курс конвертации
  exchangeRate: number;
  
  // Комиссии
  commissions: CommissionRates;
  
  // Распределение прибыли
  profit?: {
    total: number;
    breakdown: {
      [key: string]: number;
    };
  };
}

export interface CalculatorSettings {
  id: string;
  userId: string;
  role: UserRole;
  
  // Настройки отображения полей
  visibleFields: string[];
  editableFields: string[];
  
  // Настройки комиссий
  commissionRates: CommissionRates;
  
  // Ограничения
  limits: {
    minAmount: number;
    maxAmount: number;
    minCommission: number;
    maxCommission: number;
  };
  
  // Настройки валют
  currencies: {
    base: string;
    available: string[];
  };
  
  updatedAt: Date;
}

export interface CalculatorFormData {
  amount: number;
  currency: string;
  targetCurrency: string;
  exchangeRate?: number;
  commissionRates?: Partial<CommissionRates>;
}

export interface CalculatorState {
  formData: CalculatorFormData;
  result: CalculationResult | null;
  settings: CalculatorSettings;
  isCalculating: boolean;
  error: string | null;
}

export interface CalculatorAction {
  type: 'SET_FORM_DATA' | 'SET_RESULT' | 'SET_ERROR' | 'START_CALCULATION' | 'END_CALCULATION';
  payload?: any;
}

export interface ApplicationData extends CalculationResult {
  id: string;
  calculationId: string;
  userId: string;
  partnerId?: string;
  managerId?: string;
  status: 'draft' | 'pending' | 'approved' | 'rejected';
  comments: Array<{
    id: string;
    userId: string;
    text: string;
    createdAt: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

export interface Coefficient {
  id: string;
  name: string;
  value: number;
  type: 'base' | 'vat' | 'agent' | 'partner' | 'manager';
  description: string;
  minValue: number;
  maxValue: number;
  updatedAt: Date;
  updatedBy: string;
}

export interface Partner {
  id: string;
  name: string;
  companies: Company[];
}

export interface Company {
  id: string;
  name: string;
  partnerId: string;
}

export interface Broker {
  id: string;
  name: string;
  partners: Partner[];
}

export interface ExchangeRate {
  source: string;
  rate: number;
  timestamp: string;
}

export interface ExchangeRateSource {
  id: string;
  name: string;
  code: string;
  description: string;
  currencies: {
    from: string[];
    to: string[];
  };
  updateInterval: number;
  lastUpdate: Date;
}

export interface Coefficients {
  conversionFee: number;
  subagentFee: number;
  bankFee: number;
  partnerRate: number;
  platformRate: number;
}

export interface PartnerSettings {
  id: string;
  partnerId: string;
  partnerName: string;
  companyId?: string;
  companyName?: string;
  coefficients: Coefficients;
  exchangeRateSource: string;
  preferredCurrencies: string[];
  lastUsed: Date;
}

export interface DetailedCalculationResult {
  // Основная информация
  client: string;
  timestamp: string;
  date: string;
  rate: number;
  amount: number;
  currency: string;
  
  // Курсы и конвертация
  exchangeRate: number;
  usdtRate: number;         // Курс USDT/RUB
  fiatUsdtRate: number;     // Курс FIAT/USDT
  crossRate: number;        // Кросс-курс
  
  // Суммы
  invoiceAmount: number;    // Сумма инвойса
  fixationRate: number;     // Курс фиксации
  incomingAmount: number;   // Сумма поступления
  contractAmount: number;   // Сумма по контракту
  fiatAmount: number;       // Сумма в FIAT
  
  // Разницы и комиссии
  exchangeDifference: number;     // Курсовая разница
  commissionAmount: number;       // Общая сумма комиссии
  conversionCommission: number;   // Комиссия за конвертацию
  subagentCommission: number;     // Комиссия субагента
  bankCommission: number;         // Банковская комиссия
  loansAndExpenses: number;       // Займы и иные расходы
  
  // Идентификаторы
  brokerId: string;
  brokerName: string;
  partnerId: string;
  partnerName: string;
  companyId: string;
  companyName: string;
  
  // Комиссии
  adminCommission: number;
  brokerCommission: number;
  partnerCommission: number;
  
  // Партнерские вознаграждения
  partnerRate: number;          // Ставка партнера
  partnerCommission: number;    // Вознаграждение партнера
  platformRate: number;         // Ставка платформы
  platformCommission: number;   // Вознаграждение платформы
  
  // Налоги
  vat: number;           // НДС
  nsp: number;           // НсП
  vatNsp: number;        // Общая сумма НДС и НсП
  ebit: number;          // EBIT
  incomeTax: number;     // Налог на прибыль
  netProfit: number;     // Чистая прибыль
  
  // Результаты в разных валютах
  fiatResult: number;    // Результат в FIAT
  usdtEquivalent: number; // Эквивалент в USDT
  
  // Налоги и выплаты
  incomeTaxPartner: number;     // Подоходный налог партнера
  accruedPartnerFees: number;   // Начисленные вознаграждения партнера
  paidPartnerFees: number;      // Выплаченные вознаграждения партнера
  incomeTaxPlatform: number;    // Подоходный налог платформы
  accruedPlatformFees: number;  // Начисленные вознаграждения платформы
  paidPlatformFees: number;     // Выплаченные вознаграждения платформы
  royaltyFees: number;          // Роялти
}

export interface SavedCalculation {
  id: string;
  partnerId: string;
  companyId?: string;
  date: Date;
  settings: PartnerSettings;
  calculation: DetailedCalculationResult;
  notes?: string;
}

export interface Transaction {
  id: string;
  client: string;
  date: string;
  rate: number;
  fiat: string;
  invoiceAmount: number;
  fixationRate: number;
  incomingAmount: number;
  contractAmount: number;
  commissionAmount: number;
  
  // Конвертация
  usdtRubRate: number;
  fiatUsdtRate: number;
  crossRate: number;
  fiatAmount: number;
  exchangeDifference: number;
  
  // Комиссии
  conversionFee: number;
  subagentFee: number;
  bankFee: number;
  loanFee: number;
  
  // Партнерские
  agentRate1: number;
  agentReward1: number;
  agentRate2: number;
  agentReward2: number;
  
  // Налоги
  vatNsp: number;
  ebit: number;
  profitTax: number;
  fiatProfit: number;
  usdtProfit: number;
  
  // Распределение доходов
  agent1: {
    incomeTax: number;
    accrued: number;
    paid: number;
  };
  agent2: {
    incomeTax: number;
    accrued: number;
    paid: number;
  };
  royal: {
    accrued: number;
  };
}

export interface Currency {
  code: string;
  name: string;
}
