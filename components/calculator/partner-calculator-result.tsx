'use client';

import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Chip,
} from '@nextui-org/react';

interface PartnerCalculationResult {
  client: string;
  date: string;
  currency: string;
  invoiceAmount: number;
  fixationRate: number;
  incomingAmount: number;
  brokerCommission: number;
  partnerCommission: number;
  usdtAmount: number;
  vat: number;
  incomeTax: number;
  netProfit: number;
}

interface ResultRowProps {
  label: string;
  value: string | number;
  isTotal?: boolean;
  type?: 'success' | 'warning' | 'danger' | 'default';
}

function ResultRow({ label, value, isTotal = false, type = 'default' }: ResultRowProps) {
  const formattedValue = typeof value === 'number' ? 
    new Intl.NumberFormat('ru-RU', { 
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value) : value;

  return (
    <div className={`flex justify-between py-1 ${isTotal ? 'font-semibold' : ''}`}>
      <span>{label}</span>
      <Chip
        color={type}
        variant={isTotal ? "solid" : "flat"}
        size="sm"
      >
        {formattedValue}
      </Chip>
    </div>
  );
}

export function PartnerCalculatorResult({ result }: { result: PartnerCalculationResult }) {
  // Расчет процентного соотношения комиссий
  const totalCommission = result.brokerCommission + result.partnerCommission;
  const partnerShare = (result.partnerCommission / totalCommission) * 100;

  return (
    <Card>
      <CardHeader className="flex justify-between">
        <div>
          <h3 className="text-lg font-semibold">Результаты расчета</h3>
          <p className="text-small text-default-500">
            {new Date(result.date).toLocaleDateString('ru-RU')}
          </p>
        </div>
        <div className="text-right">
          <h4 className="font-semibold">{result.client}</h4>
          <p className="text-small text-default-500">{result.currency}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="space-y-4">
          {/* Основные суммы */}
          <div>
            <h4 className="font-medium mb-2">Основные суммы</h4>
            <ResultRow label="Сумма инвойса" value={result.invoiceAmount} />
            <ResultRow label="Курс фиксации" value={result.fixationRate} />
            <ResultRow label="Сумма поступления" value={result.incomingAmount} isTotal />
          </div>

          <Divider />

          {/* Комиссии и доходность */}
          <div>
            <h4 className="font-medium mb-2">Комиссии и доходность</h4>
            <ResultRow 
              label="Общая комиссия сделки" 
              value={totalCommission} 
              type="default"
            />
            <ResultRow 
              label="Ваша комиссия" 
              value={result.partnerCommission} 
              type="success" 
            />
            <ResultRow 
              label="Ваша доля в сделке" 
              value={`${partnerShare.toFixed(1)}%`} 
              type="success" 
              isTotal 
            />
          </div>

          <Divider />

          {/* Конвертация в USDT */}
          <div>
            <h4 className="font-medium mb-2">Конвертация в USDT</h4>
            <ResultRow 
              label="Эквивалент в USDT" 
              value={result.usdtAmount} 
              type="warning"
            />
          </div>

          <Divider />

          {/* Налоги и итоги */}
          <div>
            <h4 className="font-medium mb-2">Налоги и итоги</h4>
            <ResultRow 
              label="НДС" 
              value={result.vat} 
              type="danger"
            />
            <ResultRow 
              label="Налог на прибыль" 
              value={result.incomeTax} 
              type="danger"
            />
            <ResultRow 
              label="Чистая прибыль" 
              value={result.netProfit} 
              type="success" 
              isTotal 
            />
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
