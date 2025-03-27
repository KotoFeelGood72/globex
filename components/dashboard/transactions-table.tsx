'use client';

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react';
import { SearchIcon } from '@/components/icons/search-icon';
import { useState } from 'react';

interface Transaction {
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

interface TransactionsTableProps {
  transactions: Transaction[];
}

export function TransactionsTable({ transactions }: TransactionsTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFiat, setSelectedFiat] = useState<string>('all');

  const formatMoney = (amount: number, currency: string) => {
    // Для USDT используем специальное форматирование
    if (currency === 'USDT') {
      return `${amount.toFixed(2)} USDT`;
    }
    
    try {
      return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amount);
    } catch (error) {
      // Если валюта не поддерживается, просто форматируем число
      return `${amount.toFixed(2)} ${currency}`;
    }
  };

  const formatPercent = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('ru-RU');
  };

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.client.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFiat = selectedFiat === 'all' || tx.fiat === selectedFiat;
    return matchesSearch && matchesFiat;
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between w-full gap-4">
          <Input
            className="w-full max-w-xs"
            placeholder="Поиск по клиенту..."
            startContent={<SearchIcon className="text-default-300" />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="flex gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button variant="flat">
                  {selectedFiat === 'all' ? 'Все валюты' : selectedFiat}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                selectedKeys={[selectedFiat]}
                onSelectionChange={(keys) => setSelectedFiat(Array.from(keys)[0] as string)}
              >
                <DropdownItem key="all">Все валюты</DropdownItem>
                <DropdownItem key="USD">USD</DropdownItem>
                <DropdownItem key="CNY">CNY</DropdownItem>
                <DropdownItem key="EUR">EUR</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <div className="overflow-x-auto">
          <Table aria-label="Таблица транзакций">
            <TableHeader>
              <TableColumn>№</TableColumn>
              <TableColumn>Клиент</TableColumn>
              <TableColumn>Дата</TableColumn>
              <TableColumn>Ставка (%)</TableColumn>
              <TableColumn>FIAT</TableColumn>
              <TableColumn>Сумма инвойса</TableColumn>
              <TableColumn>Курс фиксации</TableColumn>
              <TableColumn>Сумма поступления</TableColumn>
              <TableColumn>По контракту</TableColumn>
              <TableColumn>Сумма комиссии</TableColumn>
              
              {/* Конвертация */}
              <TableColumn>USDT/RUB</TableColumn>
              <TableColumn>FIAT/USDT</TableColumn>
              <TableColumn>Кросс-курс</TableColumn>
              <TableColumn>Сумма, FIAT</TableColumn>
              <TableColumn>Курсовая разница</TableColumn>
              
              {/* Комиссии */}
              <TableColumn>Комиссии за конверт.</TableColumn>
              <TableColumn>Комиссии субагента</TableColumn>
              <TableColumn>Банковские комиссии</TableColumn>
              <TableColumn>Займы и иные расходы</TableColumn>
              
              {/* Партнерские */}
              <TableColumn>I (%)</TableColumn>
              <TableColumn>Вознагр. агента</TableColumn>
              <TableColumn>II (%)</TableColumn>
              <TableColumn>Иные агенты</TableColumn>
              
              {/* Налоги */}
              <TableColumn>НДС (12%) НсП (2%)</TableColumn>
              <TableColumn>EBIT</TableColumn>
              <TableColumn>Нал. на приб. (10%)</TableColumn>
              <TableColumn>FIAT</TableColumn>
              <TableColumn>В расчете на USDT</TableColumn>
              
              {/* Распределение доходов */}
              <TableColumn>Налог на прибыль (Агент 1)</TableColumn>
              <TableColumn>Начислено (Агент 1)</TableColumn>
              <TableColumn>Выплачено (Агент 1)</TableColumn>
              <TableColumn>Налог на прибыль (Агент 2)</TableColumn>
              <TableColumn>Начислено (Агент 2)</TableColumn>
              <TableColumn>Выплачено (Агент 2)</TableColumn>
              <TableColumn>Роялти</TableColumn>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((tx, index) => (
                <TableRow key={tx.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{tx.client}</TableCell>
                  <TableCell>{formatDate(tx.date)}</TableCell>
                  <TableCell>{formatPercent(tx.rate)}</TableCell>
                  <TableCell>{tx.fiat}</TableCell>
                  <TableCell>{formatMoney(tx.invoiceAmount, tx.fiat)}</TableCell>
                  <TableCell>{formatMoney(tx.fixationRate, 'RUB')}</TableCell>
                  <TableCell>{formatMoney(tx.incomingAmount, 'RUB')}</TableCell>
                  <TableCell>{formatMoney(tx.contractAmount, 'RUB')}</TableCell>
                  <TableCell>{formatMoney(tx.commissionAmount, 'RUB')}</TableCell>
                  
                  {/* Конвертация */}
                  <TableCell>{formatMoney(tx.usdtRubRate, 'RUB')}</TableCell>
                  <TableCell>{tx.fiatUsdtRate.toFixed(4)}</TableCell>
                  <TableCell>{tx.crossRate.toFixed(4)}</TableCell>
                  <TableCell>{formatMoney(tx.fiatAmount, tx.fiat)}</TableCell>
                  <TableCell>{formatMoney(tx.exchangeDifference, 'RUB')}</TableCell>
                  
                  {/* Комиссии */}
                  <TableCell>{formatMoney(tx.conversionFee, 'RUB')}</TableCell>
                  <TableCell>{formatMoney(tx.subagentFee, 'RUB')}</TableCell>
                  <TableCell>{formatMoney(tx.bankFee, 'RUB')}</TableCell>
                  <TableCell>{formatMoney(tx.loanFee, 'RUB')}</TableCell>
                  
                  {/* Партнерские */}
                  <TableCell>{formatPercent(tx.agentRate1)}</TableCell>
                  <TableCell>{formatMoney(tx.agentReward1, 'RUB')}</TableCell>
                  <TableCell>{formatPercent(tx.agentRate2)}</TableCell>
                  <TableCell>{formatMoney(tx.agentReward2, 'RUB')}</TableCell>
                  
                  {/* Налоги */}
                  <TableCell>{formatMoney(tx.vatNsp, 'RUB')}</TableCell>
                  <TableCell>{formatMoney(tx.ebit, 'RUB')}</TableCell>
                  <TableCell>{formatMoney(tx.profitTax, 'RUB')}</TableCell>
                  <TableCell>{formatMoney(tx.fiatProfit, tx.fiat)}</TableCell>
                  <TableCell>{formatMoney(tx.usdtProfit, 'USDT')}</TableCell>
                  
                  {/* Распределение доходов */}
                  <TableCell>{formatMoney(tx.agent1.incomeTax, 'RUB')}</TableCell>
                  <TableCell>{formatMoney(tx.agent1.accrued, 'RUB')}</TableCell>
                  <TableCell>{formatMoney(tx.agent1.paid, 'RUB')}</TableCell>
                  <TableCell>{formatMoney(tx.agent2.incomeTax, 'RUB')}</TableCell>
                  <TableCell>{formatMoney(tx.agent2.accrued, 'RUB')}</TableCell>
                  <TableCell>{formatMoney(tx.agent2.paid, 'RUB')}</TableCell>
                  <TableCell>{formatMoney(tx.royal.accrued, 'RUB')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardBody>
    </Card>
  );
}
