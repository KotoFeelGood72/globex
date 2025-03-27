'use client';

import {
  Card,
  CardBody,
  CardHeader,
  Divider,
} from '@nextui-org/react';

interface CalculatorResultProps {
  amount: number;
  rate: {
    name: string;
    value: number;
  };
  commission: number;
  total: number;
}

export function CalculatorResult({ amount, rate, commission, total }: CalculatorResultProps) {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-xl font-semibold">Результат расчета</h3>
      </CardHeader>
      <Divider />
      <CardBody className="gap-4">
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-default-500">Сумма:</span>
            <span className="font-medium">
              {new Intl.NumberFormat('ru-RU', {
                style: 'currency',
                currency: 'RUB'
              }).format(amount)}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-default-500">Тариф:</span>
            <span className="font-medium">{rate.name} ({rate.value}%)</span>
          </div>

          <div className="flex justify-between">
            <span className="text-default-500">Комиссия:</span>
            <span className="font-medium">
              {new Intl.NumberFormat('ru-RU', {
                style: 'currency',
                currency: 'RUB'
              }).format(commission)}
            </span>
          </div>

          <Divider />

          <div className="flex justify-between">
            <span className="text-lg font-semibold">Итого к оплате:</span>
            <span className="text-lg font-semibold text-primary">
              {new Intl.NumberFormat('ru-RU', {
                style: 'currency',
                currency: 'RUB'
              }).format(total)}
            </span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
