'use client';

import { useState } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Button,
  Select,
  SelectItem,
} from '@nextui-org/react';

const currencies = [
  { label: 'USD - Доллар США', value: 'USD' },
  { label: 'EUR - Евро', value: 'EUR' },
  { label: 'KGS - Кыргызский сом', value: 'KGS' },
  { label: 'RUB - Российский рубль', value: 'RUB' },
  { label: 'KZT - Казахстанский тенге', value: 'KZT' },
];

export function AdminCalculator() {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('KGS');
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('87.5');
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = () => {
    const calculatedAmount = parseFloat(amount) * parseFloat(rate);
    setResult(calculatedAmount);
  };

  const handleUpdateRate = () => {
    // Здесь будет логика обновления курса в базе данных
    console.log('Обновление курса:', { fromCurrency, toCurrency, rate });
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="shadow-sm">
        <CardHeader>
          <h2 className="text-lg font-semibold">Калькулятор валют</h2>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Из валюты"
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
            >
              {currencies.map((currency) => (
                <SelectItem key={currency.value} value={currency.value}>
                  {currency.label}
                </SelectItem>
              ))}
            </Select>

            <Select
              label="В валюту"
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
            >
              {currencies.map((currency) => (
                <SelectItem key={currency.value} value={currency.value}>
                  {currency.label}
                </SelectItem>
              ))}
            </Select>
          </div>

          <Input
            type="number"
            label="Сумма"
            placeholder="Введите сумму"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <Input
            type="number"
            label="Курс обмена"
            placeholder="Введите курс"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />

          <Button
            color="primary"
            className="w-full"
            onClick={handleCalculate}
          >
            Рассчитать
          </Button>

          {result !== null && (
            <div className="mt-4 p-4 bg-content2 rounded-lg">
              <p className="text-sm text-muted-foreground">Результат:</p>
              <p className="text-xl font-semibold">
                {amount} {fromCurrency} = {result.toFixed(2)} {toCurrency}
              </p>
              <p className="text-sm text-muted-foreground">
                По курсу: 1 {fromCurrency} = {rate} {toCurrency}
              </p>
            </div>
          )}
        </CardBody>
      </Card>

      <Card className="shadow-sm">
        <CardHeader>
          <h2 className="text-lg font-semibold">Управление курсами</h2>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Базовая валюта"
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
            >
              {currencies.map((currency) => (
                <SelectItem key={currency.value} value={currency.value}>
                  {currency.label}
                </SelectItem>
              ))}
            </Select>

            <Select
              label="Целевая валюта"
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
            >
              {currencies.map((currency) => (
                <SelectItem key={currency.value} value={currency.value}>
                  {currency.label}
                </SelectItem>
              ))}
            </Select>
          </div>

          <Input
            type="number"
            label="Новый курс"
            placeholder="Введите новый курс"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />

          <Button
            color="primary"
            className="w-full"
            onClick={handleUpdateRate}
          >
            Обновить курс
          </Button>

          <div className="mt-4">
            <h3 className="font-medium mb-2">История изменений</h3>
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex justify-between items-center text-sm p-2 bg-content2 rounded"
                >
                  <div>
                    <span className="font-medium">USD → KGS:</span> 87.5
                  </div>
                  <span className="text-muted-foreground">2 часа назад</span>
                </div>
              ))}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
