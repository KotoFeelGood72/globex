'use client';

import { useState } from 'react';
import {
  Card,
  CardBody,
  Input,
  Button,
  Select,
  SelectItem,
  Divider,
} from '@nextui-org/react';

interface Rate {
  id: string;
  name: string;
  value: number;
  minAmount: number;
  maxAmount: number;
}

interface CalculatorFormProps {
  rates: Rate[];
  onCalculate: (amount: number, rateId: string) => void;
}

export function CalculatorForm({ rates, onCalculate }: CalculatorFormProps) {
  const [amount, setAmount] = useState<string>('');
  const [selectedRate, setSelectedRate] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleCalculate = () => {
    const numAmount = parseFloat(amount);
    const rate = rates.find(r => r.id === selectedRate);

    if (!rate) {
      setError('Пожалуйста, выберите тариф');
      return;
    }

    if (isNaN(numAmount) || numAmount <= 0) {
      setError('Пожалуйста, введите корректную сумму');
      return;
    }

    if (numAmount < rate.minAmount || numAmount > rate.maxAmount) {
      setError(`Сумма должна быть от ${rate.minAmount} до ${rate.maxAmount}`);
      return;
    }

    setError('');
    onCalculate(numAmount, selectedRate);
  };

  return (
    <Card>
      <CardBody className="gap-4">
        <div className="space-y-2">
          <Select
            label="Выберите тариф"
            placeholder="Выберите тариф"
            value={selectedRate}
            onChange={(e) => setSelectedRate(e.target.value)}
          >
            {rates.map((rate) => (
              <SelectItem key={rate.id} value={rate.id}>
                {rate.name} ({rate.value}%)
              </SelectItem>
            ))}
          </Select>
          {selectedRate && (
            <p className="text-sm text-default-500">
              Минимальная сумма: {rates.find(r => r.id === selectedRate)?.minAmount} ₽
              <br />
              Максимальная сумма: {rates.find(r => r.id === selectedRate)?.maxAmount} ₽
            </p>
          )}
        </div>

        <Input
          type="number"
          label="Сумма"
          placeholder="Введите сумму"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">₽</span>
            </div>
          }
        />

        {error && (
          <p className="text-danger text-sm">{error}</p>
        )}

        <Divider />

        <Button
          color="primary"
          onClick={handleCalculate}
          isDisabled={!amount || !selectedRate}
        >
          Рассчитать
        </Button>
      </CardBody>
    </Card>
  );
}
