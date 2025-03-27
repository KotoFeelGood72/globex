'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { PartnerSelector } from './partner-selector';
import { CurrencySelector } from './currency-selector';
import { CommissionSettings } from './commission-settings';
import { CalculationResult } from './calculation-result';
import { 
  DetailedCalculationResult, 
  Coefficients, 
  SavedCalculation,
  ExchangeRateSource,
  Broker 
} from '@/types/calculator';

interface EnhancedCalculatorProps {
  broker: Broker;
  exchangeRateSources: ExchangeRateSource[];
  onSaveCalculation: (calculation: SavedCalculation) => void;
  onSaveSettings: (partnerId: string, settings: any) => void;
}

export function EnhancedCalculator({
  broker,
  exchangeRateSources,
  onSaveCalculation,
  onSaveSettings,
}: EnhancedCalculatorProps) {
  const { toast } = useToast();

  // Состояния
  const [selectedPartner, setSelectedPartner] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedSource, setSelectedSource] = useState('');
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [amount, setAmount] = useState('');
  const [calculationResult, setCalculationResult] = useState<DetailedCalculationResult | null>(null);
  const [coefficients, setCoefficients] = useState<Coefficients>({
    conversionFee: 0.5,
    subagentFee: 0.3,
    bankFee: 0.2,
    partnerRate: 1.0,
    platformRate: 0.5,
  });

  // Обработчики
  const handleSaveSettings = () => {
    if (!selectedPartner) {
      toast({
        title: 'Ошибка',
        description: 'Выберите партнера для сохранения настроек',
        variant: 'destructive',
      });
      return;
    }

    const partner = broker.partners.find(p => p.id === selectedPartner);
    const company = partner?.companies.find(c => c.id === selectedCompany);
    
    const settings = {
      id: Math.random().toString(36).substr(2, 9),
      partnerId: selectedPartner,
      partnerName: partner?.name,
      companyId: selectedCompany,
      companyName: company?.name,
      coefficients,
      exchangeRateSource: selectedSource,
      preferredCurrencies: [fromCurrency, toCurrency],
      lastUsed: new Date(),
    };

    onSaveSettings(selectedPartner, settings);
    toast({
      title: 'Готово',
      description: 'Настройки сохранены',
    });
  };

  const handleCalculate = () => {
    if (!amount || !fromCurrency || !toCurrency || !selectedSource) {
      toast({
        title: 'Ошибка',
        description: 'Заполните все необходимые поля',
        variant: 'destructive',
      });
      return;
    }

    const partner = broker.partners.find(p => p.id === selectedPartner);
    const company = partner?.companies.find(c => c.id === selectedCompany);
    const source = exchangeRateSources.find(s => s.id === selectedSource);

    if (!partner || !source) return;

    // Моковые курсы для примера
    const mockRate = 97.4100;
    const mockUsdtRate = 97.5447;
    const mockFiatUsdtRate = 1.0000;
    
    const amountNumber = parseFloat(amount);
    const invoiceAmount = amountNumber;
    const incomingAmount = invoiceAmount * mockRate;
    const contractAmount = incomingAmount * 0.95;
    
    // Комиссии
    const conversionFee = incomingAmount * (coefficients.conversionFee / 100);
    const subagentFee = incomingAmount * (coefficients.subagentFee / 100);
    const bankFee = incomingAmount * (coefficients.bankFee / 100);
    
    // Партнерские вознаграждения
    const partnerFee1 = incomingAmount * (coefficients.partnerRate / 100);
    const partnerFee2 = incomingAmount * (coefficients.platformRate / 100);
    
    // Налоги
    const vat = incomingAmount * 0.12;
    const nsp = incomingAmount * 0.02;
    const incomeTax = (incomingAmount - conversionFee - subagentFee - bankFee - partnerFee1 - partnerFee2 - vat - nsp) * 0.10;
    
    // Подоходные налоги партнеров (10%)
    const incomeTaxPartner1 = partnerFee1 * 0.10;
    const incomeTaxPartner2 = partnerFee2 * 0.10;

    const result: DetailedCalculationResult = {
      client: company?.name || partner.name,
      timestamp: new Date().toISOString(),
      date: new Date().toISOString(),
      rate: mockRate,
      amount: amountNumber,
      currency: fromCurrency,
      
      exchangeRate: mockRate,
      usdtRate: mockUsdtRate,
      fiatUsdtRate: mockFiatUsdtRate,
      crossRate: mockRate / mockUsdtRate,
      
      invoiceAmount,
      fixationRate: mockRate,
      incomingAmount,
      contractAmount,
      fiatAmount: amountNumber,
      
      exchangeDifference: (mockRate - mockUsdtRate) * amountNumber,
      commissionAmount: conversionFee + subagentFee + bankFee,
      conversionCommission: conversionFee,
      subagentCommission: subagentFee,
      bankCommission: bankFee,
      loansAndExpenses: 0,
      
      brokerId: broker.id,
      brokerName: broker.name,
      partnerId: partner.id,
      partnerName: partner.name,
      companyId: company?.id || '',
      companyName: company?.name || '',
      
      adminCommission: 0,
      brokerCommission: 0,
      partnerCommission: partnerFee1 + partnerFee2,
      
      partnerRate1: coefficients.partnerRate,
      partnerCommission1: partnerFee1,
      partnerRate2: coefficients.platformRate,
      partnerCommission2: partnerFee2,
      
      vat,
      nsp,
      vatNsp: vat + nsp,
      ebit: incomingAmount - conversionFee - subagentFee - bankFee - partnerFee1 - partnerFee2 - vat - nsp,
      incomeTax,
      netProfit: incomingAmount - conversionFee - subagentFee - bankFee - partnerFee1 - partnerFee2 - vat - nsp - incomeTax,
      
      fiatResult: amountNumber,
      usdtEquivalent: amountNumber * mockFiatUsdtRate,
      
      incomeTaxPartner1,
      accruedPartnerFees1: partnerFee1,
      paidPartnerFees1: partnerFee1 - incomeTaxPartner1,
      incomeTaxPartner2,
      accruedPartnerFees2: partnerFee2,
      paidPartnerFees2: partnerFee2 - incomeTaxPartner2,
      royaltyFees: 0,
    };

    setCalculationResult(result);
    
    const calculation: SavedCalculation = {
      id: Math.random().toString(36).substr(2, 9),
      partnerId: partner.id,
      companyId: company?.id,
      date: new Date(),
      settings: {
        id: Math.random().toString(36).substr(2, 9),
        partnerId: partner.id,
        partnerName: partner.name,
        companyId: company?.id,
        companyName: company?.name,
        coefficients,
        exchangeRateSource: selectedSource,
        preferredCurrencies: [fromCurrency, toCurrency],
        lastUsed: new Date(),
      },
      calculation: result,
      notes: '',
    };

    onSaveCalculation(calculation);
    toast({
      title: 'Готово',
      description: 'Расчет выполнен и сохранен',
    });
  };

  return (
    <div className="container mx-auto px-4 space-y-6 max-w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PartnerSelector
          partners={broker.partners}
          selectedPartnerId={selectedPartner}
          selectedCompanyId={selectedCompany}
          onPartnerChange={setSelectedPartner}
          onCompanyChange={setSelectedCompany}
        />

        <div className="h-[300px]">
          <CommissionSettings
            coefficients={coefficients}
            onCoefficientsChange={setCoefficients}
            onSave={handleSaveSettings}
          />
        </div>
      </div>

      <CurrencySelector
        sources={exchangeRateSources}
        selectedSourceId={selectedSource}
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
        amount={amount}
        onSourceChange={setSelectedSource}
        onFromCurrencyChange={setFromCurrency}
        onToCurrencyChange={setToCurrency}
        onAmountChange={setAmount}
      />

      <Button onClick={handleCalculate} className="w-full">
        Рассчитать
      </Button>

      {calculationResult && <CalculationResult result={calculationResult} />}
    </div>
  );
}
