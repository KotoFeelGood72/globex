'use client';

import { Card, CardBody, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Divider } from '@nextui-org/react';

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

export function DetailedCalculatorResult({ result }: { result: DetailedCalculationResult }) {
  return (
    <Card>
      <CardBody>
        <div className="space-y-4">
          {/* Базовая информация */}
          <Table aria-label="Базовая информация">
            <TableHeader>
              <TableColumn>Показатель</TableColumn>
              <TableColumn>Значение</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Клиент</TableCell>
                <TableCell>{result.client}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Дата</TableCell>
                <TableCell>{new Date(result.date).toLocaleDateString('ru-RU')}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Валюта</TableCell>
                <TableCell>{result.currency}</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Divider />

          {/* Инвойс и входящие суммы */}
          <Table aria-label="Инвойс и входящие суммы">
            <TableHeader>
              <TableColumn>Показатель</TableColumn>
              <TableColumn>Значение</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Сумма инвойса</TableCell>
                <TableCell>{result.invoiceAmount.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Курс фиксации</TableCell>
                <TableCell>{result.fixationRate.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Сумма поступления</TableCell>
                <TableCell>{result.incomingAmount.toFixed(2)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Divider />

          {/* Конвертация */}
          <Table aria-label="Конвертация">
            <TableHeader>
              <TableColumn>Показатель</TableColumn>
              <TableColumn>Значение</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Сумма по контракту</TableCell>
                <TableCell>{result.contractAmount.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Сумма комиссии</TableCell>
                <TableCell>{result.commissionAmount.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Курс USDT/RUB</TableCell>
                <TableCell>{result.usdtRate.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Курс FIAT/USDT</TableCell>
                <TableCell>{result.fiatUsdtRate.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Кросс-курс</TableCell>
                <TableCell>{result.crossRate.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Курсовая разница</TableCell>
                <TableCell>{result.exchangeDifference.toFixed(2)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Divider />

          {/* Комиссии */}
          <Table aria-label="Комиссии">
            <TableHeader>
              <TableColumn>Показатель</TableColumn>
              <TableColumn>Значение</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Комиссии за конвертацию</TableCell>
                <TableCell>{result.conversionCommission.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Комиссии субагента</TableCell>
                <TableCell>{result.subagentCommission.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Банковские комиссии</TableCell>
                <TableCell>{result.bankCommission.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Займы и иные расходы</TableCell>
                <TableCell>{result.loansAndExpenses.toFixed(2)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Divider />

          {/* Партнерские */}
          <Table aria-label="Партнерские">
            <TableHeader>
              <TableColumn>Показатель</TableColumn>
              <TableColumn>Значение</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Ставка агента 1 (%)</TableCell>
                <TableCell>{result.agentRate1.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Комиссия агента 1</TableCell>
                <TableCell>{result.agentCommission1.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Ставка агента 2 (%)</TableCell>
                <TableCell>{result.agentRate2.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Комиссия агента 2</TableCell>
                <TableCell>{result.agentCommission2.toFixed(2)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Divider />

          {/* Налоги */}
          <Table aria-label="Налоги">
            <TableHeader>
              <TableColumn>Показатель</TableColumn>
              <TableColumn>Значение</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>НДС (%)</TableCell>
                <TableCell>{(result.vat * 100).toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>НСП (%)</TableCell>
                <TableCell>{(result.nsp * 100).toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Налог на прибыль (%)</TableCell>
                <TableCell>{(result.incomeTax * 100).toFixed(2)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Divider />

          {/* Итоги */}
          <Table aria-label="Итоги">
            <TableHeader>
              <TableColumn>Показатель</TableColumn>
              <TableColumn>Значение</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>EBIT</TableCell>
                <TableCell>{result.ebit.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Чистая прибыль</TableCell>
                <TableCell>{result.netProfit.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Результат в FIAT</TableCell>
                <TableCell>{result.fiatResult.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Эквивалент в USDT</TableCell>
                <TableCell>{result.usdtEquivalent.toFixed(2)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Divider />

          {/* Распределение доходов */}
          <Table aria-label="Распределение доходов">
            <TableHeader>
              <TableColumn>Агент</TableColumn>
              <TableColumn>Подоходный налог</TableColumn>
              <TableColumn>Начисленные агентские</TableColumn>
              <TableColumn>Выплаченные агентские</TableColumn>
              <TableColumn>Роялти</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Агент 1</TableCell>
                <TableCell>{result.incomeTaxAgent1.toFixed(2)}</TableCell>
                <TableCell>{result.accruedAgentFees1.toFixed(2)}</TableCell>
                <TableCell>{result.paidAgentFees1.toFixed(2)}</TableCell>
                <TableCell>{result.royaltyFees.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Агент 2</TableCell>
                <TableCell>{result.incomeTaxAgent2.toFixed(2)}</TableCell>
                <TableCell>{result.accruedAgentFees2.toFixed(2)}</TableCell>
                <TableCell>{result.paidAgentFees2.toFixed(2)}</TableCell>
                <TableCell>-</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardBody>
    </Card>
  );
}
