'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardBody,
  Input,
  Button,
  Divider,
  Select,
  SelectItem,
  Tooltip,
} from '@nextui-org/react';
import { useExchangeRates, ExchangeRateSource } from '@/hooks/use-exchange-rates';
import { CoefficientSettings } from './coefficient-settings';
import { ClipboardIcon } from '@/components/icons/clipboard-icon';
import { RefreshIcon } from '@/components/icons/refresh-icon';

interface DetailedCalculationResult {
  // Базовая информация
  client: string;
  date: string;
  rate: number;
  
  // Инвойс и FIAT
  currency: string;
  invoiceAmount: number;
  fixationRate: number;
  incomingAmount: number;
  
  // Конвертация
  contractAmount: number;
  commissionAmount: number;
  usdtRate: number;
  fiatUsdtRate: number;
  crossRate: number;
  fiatAmount: number;
  exchangeDifference: number;
  
  // Комиссии
  conversionCommission: number;
  subagentCommission: number;
  bankCommission: number;
  loansAndExpenses: number;
  
  // Партнерские
  agentRate1: number;
  agentCommission1: number;
  agentRate2: number;
  agentCommission2: number;
  
  // Налоги
  vat: number;
  nsp: number;
  incomeTax: number;
  
  // Итоги
  ebit: number;
  netProfit: number;
  fiatResult: number;
  usdtEquivalent: number;
  
  // Распределение доходов
  incomeTaxAgent1: number;
  accruedAgentFees1: number;
  paidAgentFees1: number;
  incomeTaxAgent2: number;
  accruedAgentFees2: number;
  paidAgentFees2: number;
  royaltyFees: number;
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

export function DetailedCalculatorForm({ onCalculate }: { onCalculate: (result: DetailedCalculationResult) => void }) {
  const { rates, fetchRate, isLoading } = useExchangeRates();
  const [formData, setFormData] = useState({
    client: '',
    date: new Date().toISOString().slice(0, 16),
    rate: '',
    currency: 'USD',
    invoiceAmount: '',
    fixationRate: '',
    usdtRate: '',
    fiatUsdtRate: '',
    agentRate1: '',
    agentRate2: '',
    vatRate: '12',
    nspRate: '2',
    incomeTaxRate: '10',
    rateSource: 'CBR' as ExchangeRateSource,
  });

  const calculateResult = () => {
    const result: DetailedCalculationResult = {
      // Заполняем все поля на основе введенных данных и расчетов
      client: formData.client,
      date: formData.date,
      rate: parseFloat(formData.rate),
      currency: formData.currency,
      invoiceAmount: parseFloat(formData.invoiceAmount),
      fixationRate: parseFloat(formData.fixationRate),
      incomingAmount: parseFloat(formData.invoiceAmount) * parseFloat(formData.fixationRate),
      
      // Конвертация
      contractAmount: parseFloat(formData.invoiceAmount),
      commissionAmount: parseFloat(formData.invoiceAmount) * (parseFloat(formData.rate) / 100),
      usdtRate: parseFloat(formData.usdtRate),
      fiatUsdtRate: parseFloat(formData.fiatUsdtRate),
      crossRate: parseFloat(formData.usdtRate) * parseFloat(formData.fiatUsdtRate),
      fiatAmount: parseFloat(formData.invoiceAmount) * parseFloat(formData.fixationRate),
      exchangeDifference: 0, // Рассчитываем разницу курсов
      
      // Комиссии
      conversionCommission: 0,
      subagentCommission: 0,
      bankCommission: 0,
      loansAndExpenses: 0,
      
      // Партнерские
      agentRate1: parseFloat(formData.agentRate1),
      agentCommission1: parseFloat(formData.invoiceAmount) * (parseFloat(formData.agentRate1) / 100),
      agentRate2: parseFloat(formData.agentRate2),
      agentCommission2: parseFloat(formData.invoiceAmount) * (parseFloat(formData.agentRate2) / 100),
      
      // Налоги
      vat: parseFloat(formData.vatRate) / 100,
      nsp: parseFloat(formData.nspRate) / 100,
      incomeTax: parseFloat(formData.incomeTaxRate) / 100,
      
      // Итоги
      ebit: 0, // Рассчитываем EBIT
      netProfit: 0, // Рассчитываем чистую прибыль
      fiatResult: 0,
      usdtEquivalent: 0,
      
      // Распределение доходов
      incomeTaxAgent1: 0,
      accruedAgentFees1: 0,
      paidAgentFees1: 0,
      incomeTaxAgent2: 0,
      accruedAgentFees2: 0,
      paidAgentFees2: 0,
      royaltyFees: 0,
    };

    // Рассчитываем производные значения
    result.exchangeDifference = result.fiatAmount - (result.contractAmount * result.crossRate);
    result.ebit = result.fiatAmount - result.conversionCommission - result.subagentCommission - 
                 result.bankCommission - result.loansAndExpenses - result.agentCommission1 - 
                 result.agentCommission2 - (result.fiatAmount * result.vat) - 
                 (result.fiatAmount * result.nsp);
    result.netProfit = result.ebit * (1 - result.incomeTax);

    onCalculate(result);
    return result;
  };

  const copyResultToClipboard = () => {
    const result = calculateResult();
    if (result) {
      const markdownTable = `
| Показатель | Значение |
|------------|----------|
| Клиент | ${result.client} |
| Дата | ${new Date(result.date).toLocaleDateString('ru-RU')} |
| Валюта | ${result.currency} |
| Сумма инвойса | ${result.invoiceAmount.toFixed(2)} |
| Курс фиксации | ${result.fixationRate.toFixed(2)} |
| Сумма поступления | ${result.incomingAmount.toFixed(2)} |
| Комиссия | ${result.commissionAmount.toFixed(2)} |
| Курс USDT/RUB | ${result.usdtRate.toFixed(2)} |
| Курс FIAT/USDT | ${result.fiatUsdtRate.toFixed(2)} |
| Кросс-курс | ${result.crossRate.toFixed(2)} |
| Курсовая разница | ${result.exchangeDifference.toFixed(2)} |
| Комиссии за конвертацию | ${result.conversionCommission.toFixed(2)} |
| Комиссии субагента | ${result.subagentCommission.toFixed(2)} |
| Банковские комиссии | ${result.bankCommission.toFixed(2)} |
| Агентское вознаграждение 1 | ${result.agentCommission1.toFixed(2)} |
| Агентское вознаграждение 2 | ${result.agentCommission2.toFixed(2)} |
| НДС | ${(result.fiatAmount * result.vat).toFixed(2)} |
| НСП | ${(result.fiatAmount * result.nsp).toFixed(2)} |
| EBIT | ${result.ebit.toFixed(2)} |
| Налог на прибыль | ${(result.ebit * result.incomeTax).toFixed(2)} |
| Чистая прибыль | ${result.netProfit.toFixed(2)} |

### Распределение доходов
| Агент | Подоходный налог | Начисленные агентские | Выплаченные агентские | Роялти |
|-------|------------------|----------------------|----------------------|---------|
| Агент 1 | ${result.incomeTaxAgent1.toFixed(2)} | ${result.accruedAgentFees1.toFixed(2)} | ${result.paidAgentFees1.toFixed(2)} | ${result.royaltyFees.toFixed(2)} |
| Агент 2 | ${result.incomeTaxAgent2.toFixed(2)} | ${result.accruedAgentFees2.toFixed(2)} | ${result.paidAgentFees2.toFixed(2)} | - |
`.trim();

      navigator.clipboard.writeText(markdownTable);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRefreshRate = async () => {
    const rate = await fetchRate(formData.rateSource as ExchangeRateSource);
    if (rate) {
      setFormData(prev => ({
        ...prev,
        rate: rate.toString()
      }));
    }
  };

  return (
    <Card>
      <CardBody className="gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="text"
            label="Клиент"
            placeholder="Введите клиента"
            value={formData.client}
            onChange={(e) => handleInputChange('client', e.target.value)}
          />

          <Input
            type="datetime-local"
            label="Дата и время"
            value={formData.date}
            onChange={(e) => handleInputChange('date', e.target.value)}
          />

          <Select
            label="Валюта"
            value={formData.currency}
            onChange={(e) => handleInputChange('currency', e.target.value)}
          >
            {currencies.map(currency => (
              <SelectItem key={currency.code} value={currency.code}>{currency.name}</SelectItem>
            ))}
          </Select>

          <Input
            type="number"
            label="Сумма инвойса"
            placeholder="Введите сумму"
            value={formData.invoiceAmount}
            onChange={(e) => handleInputChange('invoiceAmount', e.target.value)}
          />

          <Input
            type="number"
            label="Курс фиксации"
            placeholder="Введите курс"
            value={formData.fixationRate}
            onChange={(e) => handleInputChange('fixationRate', e.target.value)}
          />

          <Input
            type="number"
            label="Курс USDT/RUB"
            placeholder="Введите курс"
            value={formData.usdtRate}
            onChange={(e) => handleInputChange('usdtRate', e.target.value)}
          />

          <Input
            type="number"
            label="Курс FIAT/USDT"
            placeholder="Введите курс"
            value={formData.fiatUsdtRate}
            onChange={(e) => handleInputChange('fiatUsdtRate', e.target.value)}
          />

          <Input
            type="number"
            label="Ставка комиссии (%)"
            placeholder="Введите ставку"
            value={formData.rate}
            onChange={(e) => handleInputChange('rate', e.target.value)}
          />

          <div className="flex gap-2">
            <Select
              label="Источник курса"
              value={formData.rateSource}
              onChange={(e) => handleInputChange('rateSource', e.target.value)}
            >
              <SelectItem key="CBR" value="CBR">ЦБ РФ</SelectItem>
              <SelectItem key="Investing" value="Investing">Investing.com</SelectItem>
            </Select>

            <div className="flex items-end">
              <Tooltip content="Обновить курс">
                <Button 
                  isIconOnly
                  onPress={handleRefreshRate}
                  isLoading={isLoading}
                >
                  <RefreshIcon />
                </Button>
              </Tooltip>
            </div>
          </div>

          <Input
            type="number"
            label="Ставка НДС (%)"
            value={formData.vatRate}
            onChange={(e) => handleInputChange('vatRate', e.target.value)}
          />

          <Input
            type="number"
            label="Ставка НСП (%)"
            value={formData.nspRate}
            onChange={(e) => handleInputChange('nspRate', e.target.value)}
          />

          <Input
            type="number"
            label="Ставка налога на прибыль (%)"
            value={formData.incomeTaxRate}
            onChange={(e) => handleInputChange('incomeTaxRate', e.target.value)}
          />

          <Input
            type="number"
            label="Ставка агентского вознаграждения 1 (%)"
            value={formData.agentRate1}
            onChange={(e) => handleInputChange('agentRate1', e.target.value)}
          />

          <Input
            type="number"
            label="Ставка агентского вознаграждения 2 (%)"
            value={formData.agentRate2}
            onChange={(e) => handleInputChange('agentRate2', e.target.value)}
          />
        </div>

        <Divider />

        <div className="flex gap-2 justify-end">
          <Button
            color="primary"
            onClick={calculateResult}
            isDisabled={!formData.invoiceAmount || !formData.fixationRate || !formData.rate}
          >
            Рассчитать
          </Button>

          <Tooltip content="Копировать результат">
            <Button
              variant="flat"
              isIconOnly
              onClick={copyResultToClipboard}
            >
              <ClipboardIcon />
            </Button>
          </Tooltip>
        </div>
      </CardBody>
    </Card>
  );
}
