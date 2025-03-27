'use client';

import { useState } from 'react';
import {
  Card,
  CardBody,
  Input,
  Button,
  Divider,
  Select,
  SelectItem,
  Tooltip,
  Chip,
} from '@nextui-org/react';
import { useExchangeRates } from '@/hooks/use-exchange-rates';
import { ClipboardIcon } from '@/components/icons/clipboard-icon';
import { RefreshIcon } from '@/components/icons/refresh-icon';
import { DetailedCalculationResult } from '@/types/calculator';

interface BrokerInfo {
  id: string;
  name: string;
  baseRate: number;
  partnerRate: number;
  currentRate: {
    USDT_RUB: number;
    FIAT_USDT: number;
  };
}

interface PartnerCalculatorFormProps {
  brokerInfo: BrokerInfo;
  onCalculate: (result: DetailedCalculationResult) => void;
}

interface Currency {
  code: string;
  name: string;
}

const currencies: Currency[] = [
  { code: 'RUB', name: 'Российский рубль' },
  { code: 'USD', name: 'Доллар США' },
  { code: 'EUR', name: 'Евро' },
  { code: 'USDT', name: 'USDT' },
];

const TAX_RATES = {
  vat: 12, // НДС
  nsp: 2,  // НсП
  incomeTax: 10, // Налог на прибыль
};

export function PartnerCalculatorForm({ brokerInfo, onCalculate }: PartnerCalculatorFormProps) {
  const { rates, fetchRate, isLoading } = useExchangeRates();
  const [formData, setFormData] = useState({
    client: '',
    date: new Date().toISOString().slice(0, 16),
    currency: 'USD',
    invoiceAmount: '',
    fixationRate: '',
  });

  const calculateResult = () => {
    const invoiceAmount = parseFloat(formData.invoiceAmount);
    const fixationRate = parseFloat(formData.fixationRate);
    const incomingAmount = invoiceAmount * fixationRate;
    
    // Базовые комиссии
    const conversionCommission = incomingAmount * 0.015; // 1.5% за конвертацию
    const subagentCommission = incomingAmount * 0.005; // 0.5% субагентская
    const bankCommission = incomingAmount * 0.002; // 0.2% банковская
    
    // Комиссии участников
    const brokerCommission = invoiceAmount * (brokerInfo.baseRate / 100);
    const partnerCommission = invoiceAmount * (brokerInfo.partnerRate / 100);
    const platformCommission = invoiceAmount * 0.005; // 0.5% комиссия платформы
    
    // Налоги
    const vat = incomingAmount * (TAX_RATES.vat / 100);
    const nsp = incomingAmount * (TAX_RATES.nsp / 100);
    const vatNsp = vat + nsp;
    
    // Прибыль до налогов (EBIT)
    const ebit = incomingAmount - conversionCommission - subagentCommission - 
                bankCommission - brokerCommission - partnerCommission - platformCommission - 
                vatNsp;
    
    // Налог на прибыль для участников
    const incomeTaxPartner = partnerCommission * (TAX_RATES.incomeTax / 100);
    const incomeTaxPlatform = platformCommission * (TAX_RATES.incomeTax / 100);
    
    // Суммы к выплате
    const paidPartnerFees = partnerCommission - incomeTaxPartner;
    const paidPlatformFees = platformCommission - incomeTaxPlatform;
    
    // Конвертация в USDT
    const usdtAmount = incomingAmount / brokerInfo.currentRate.USDT_RUB;
    const fiatResult = usdtAmount * brokerInfo.currentRate.FIAT_USDT;
    
    const result: DetailedCalculationResult = {
      // Базовая информация
      client: formData.client,
      timestamp: new Date().toISOString(),
      date: formData.date,
      rate: fixationRate,
      amount: invoiceAmount,
      currency: formData.currency,
      exchangeRate: fixationRate,
      
      // Курсы
      usdtRate: brokerInfo.currentRate.USDT_RUB,
      fiatUsdtRate: brokerInfo.currentRate.FIAT_USDT,
      crossRate: fixationRate / brokerInfo.currentRate.USDT_RUB,
      
      // Суммы
      invoiceAmount: invoiceAmount,
      fixationRate: fixationRate,
      incomingAmount: incomingAmount,
      contractAmount: incomingAmount,
      fiatAmount: fiatResult,
      exchangeDifference: 0,
      commissionAmount: conversionCommission + subagentCommission + bankCommission,
      
      // Комиссии за операции
      conversionCommission,
      subagentCommission,
      bankCommission,
      loansAndExpenses: 0,
      
      // Участники
      brokerId: brokerInfo.id,
      brokerName: brokerInfo.name,
      partnerId: '1', // TODO: Добавить реальный ID партнера
      partnerName: 'Партнер', // TODO: Добавить реальное имя партнера
      companyId: '1', // TODO: Добавить реальный ID компании
      companyName: 'Компания', // TODO: Добавить реальное название компании
      
      // Комиссии участников
      adminCommission: 0,
      brokerCommission,
      partnerCommission,
      partnerRate: brokerInfo.partnerRate,
      platformRate: 0.5,
      platformCommission,
      
      // Налоги
      vat,
      nsp,
      vatNsp,
      ebit,
      incomeTax: incomeTaxPartner + incomeTaxPlatform,
      netProfit: ebit - incomeTaxPartner - incomeTaxPlatform,
      
      // Суммы к выплате
      incomeTaxPartner,
      accruedPartnerFees: partnerCommission,
      paidPartnerFees,
      incomeTaxPlatform,
      accruedPlatformFees: platformCommission,
      paidPlatformFees,
      
      // Итоговые показатели
      fiatResult,
      usdtEquivalent: usdtAmount,
      royaltyFees: 0,
    };

    onCalculate(result);
    return result;
  };

  return (
    <Card className="w-full">
      <CardBody className="gap-4">
        {/* Информация о брокере */}
        <div className="bg-default-100 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Информация о брокере</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-default-600">Ваш брокер</p>
              <p className="font-medium">{brokerInfo.name}</p>
            </div>
            <div>
              <p className="text-sm text-default-600">Ваша комиссия</p>
              <Chip color="success" variant="flat">{brokerInfo.partnerRate}%</Chip>
            </div>
          </div>
          <Divider className="my-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-default-600">Текущий курс USDT/RUB</p>
              <p className="font-medium">{brokerInfo.currentRate.USDT_RUB}</p>
            </div>
            <div>
              <p className="text-sm text-default-600">Текущий курс FIAT/USDT</p>
              <p className="font-medium">{brokerInfo.currentRate.FIAT_USDT}</p>
            </div>
          </div>
        </div>

        <Divider />

        {/* Базовая информация */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Клиент"
            value={formData.client}
            onChange={(e) => setFormData({ ...formData, client: e.target.value })}
          />
          <Input
            type="datetime-local"
            label="Дата"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
        </div>

        <Divider />

        {/* Валюта и суммы */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            label="Валюта"
            value={formData.currency}
            onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
          >
            {currencies.map((currency) => (
              <SelectItem key={currency.code} value={currency.code}>
                {currency.name}
              </SelectItem>
            ))}
          </Select>
          <Input
            type="number"
            label="Сумма инвойса"
            value={formData.invoiceAmount}
            onChange={(e) => setFormData({ ...formData, invoiceAmount: e.target.value })}
          />
          <Input
            type="number"
            label="Курс фиксации"
            value={formData.fixationRate}
            onChange={(e) => setFormData({ ...formData, fixationRate: e.target.value })}
          />
        </div>

        {/* Кнопки управления */}
        <div className="flex justify-end gap-2 mt-4">
          <Tooltip content="Обновить курсы">
            <Button
              isIconOnly
              variant="flat"
              onPress={() => fetchRate()}
              isLoading={isLoading}
            >
              <RefreshIcon />
            </Button>
          </Tooltip>
          <Tooltip content="Копировать результат">
            <Button
              isIconOnly
              variant="flat"
              onPress={() => {
                const result = calculateResult();
                navigator.clipboard.writeText(JSON.stringify(result, null, 2));
              }}
            >
              <ClipboardIcon />
            </Button>
          </Tooltip>
          <Button
            color="primary"
            onPress={calculateResult}
          >
            Рассчитать
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
