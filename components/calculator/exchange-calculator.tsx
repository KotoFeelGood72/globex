'use client';

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useExchangeRates } from '@/lib/exchange-rates';
import { AlertCircle, ArrowLeftRight } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export function ExchangeCalculator() {
  const { rates, isLoading, error, updateRates, lastUpdated } = useExchangeRates();
  const [amount, setAmount] = useState<string>('');
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('RUB');
  const [isEscrow, setIsEscrow] = useState<boolean>(false);
  const [isUrgent, setIsUrgent] = useState<boolean>(false);

  // Базовый коэффициент 3% + доп. проценты за опции
  const getCoefficient = () => {
    let coefficient = 1.03; // базовый 3%
    if (isEscrow) coefficient += 0.01; // +1% за эскроу
    if (isUrgent) coefficient += 0.01; // +1% за срочность
    return coefficient;
  };

  const getCommissionText = () => {
    let text = 'Конвертация 2.5%, комиссия 0.5%';
    if (isEscrow) text += ', эскроу +1%';
    if (isUrgent) text += ', срочность +1%';
    return text;
  };

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  // Обновляем курсы каждую минуту
  useEffect(() => {
    // Первоначальное обновление
    updateRates();

    // Устанавливаем интервал обновления
    const interval = setInterval(() => {
      updateRates();
    }, 60000); // 60000 мс = 1 минута

    // Очищаем интервал при размонтировании компонента
    return () => clearInterval(interval);
  }, [updateRates]);

  // Функция конвертации валют
  const convertCurrency = (amount: number, from: string, to: string) => {
    if (from === to) return amount;
    
    const fromRate = rates[from]?.rate || 1;
    const toRate = rates[to]?.rate || 1;
    
    // Если конвертируем из рубля
    if (from === 'RUB') {
      return amount / toRate;
    }
    // Если конвертируем в рубль
    if (to === 'RUB') {
      return amount * fromRate;
    }
    // Кросс-курс для других валют
    return amount * (fromRate / toRate);
  };

  const calculatedAmount = amount 
    ? convertCurrency(Number(amount), fromCurrency, toCurrency) * getCoefficient()
    : 0;

  return (
    <Card className="w-full mx-2">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold">Калькулятор обмена валют</h3>
            <div className="flex items-center gap-2">
              {isLoading && <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />}
              {lastUpdated && (
                <p className="text-sm text-gray-500">
                  Последнее обновление: {new Date(lastUpdated).toLocaleTimeString()}
                </p>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Ошибка при получении курсов валют. Используются резервные значения.
            </AlertDescription>
          </Alert>
        )}
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="amount">Сумма</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Введите сумму"
              className="mt-1"
            />
          </div>

          <div className="grid grid-cols-[1fr,auto,1fr] gap-2 items-end">
            <div>
              <Label>Из валюты</Label>
              <Select
                value={fromCurrency}
                onValueChange={setFromCurrency}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Выберите валюту" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(rates).map(([code, currency]) => (
                    <SelectItem key={code} value={code}>
                      {code} - {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleSwapCurrencies}
              className="p-2 rounded-lg hover:bg-accent flex items-center justify-center mb-[2px]"
            >
              <ArrowLeftRight className="w-5 h-5" />
            </motion.button>

            <div>
              <Label>В валюту</Label>
              <Select
                value={toCurrency}
                onValueChange={setToCurrency}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Выберите валюту" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(rates).map(([code, currency]) => (
                    <SelectItem key={code} value={code}>
                      {code} - {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="pt-4">
            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="escrow"
                  checked={isEscrow}
                  onChange={(e) => setIsEscrow(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label htmlFor="escrow" className="text-sm font-medium">
                  Оплата по экскроу (+1%)
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="urgent"
                  checked={isUrgent}
                  onChange={(e) => setIsUrgent(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label htmlFor="urgent" className="text-sm font-medium">
                  Срочный платеж 1 день (+1%)
                </label>
              </div>
            </div>

            <p className="text-lg font-semibold">
              Результат: {calculatedAmount.toFixed(2)} {toCurrency}
            </p>
            <p className="text-sm text-gray-500">
              Курс примерно: 1 {fromCurrency} = {(
                (toCurrency === 'RUB' 
                  ? rates[fromCurrency]?.rate 
                  : rates[toCurrency]?.rate
                ) * getCoefficient()
              ).toFixed(2)} RUB
            </p>
            <p className="text-sm text-gray-500">
              {getCommissionText()}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
