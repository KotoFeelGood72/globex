'use client';

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Chip,
} from '@nextui-org/react';
import { SearchIcon } from '@/components/icons/search-icon';
import { DetailedCalculationResult } from '@/types/calculator';

interface CalculationHistoryProps {
  calculations: DetailedCalculationResult[];
  brokers: { id: string; name: string }[];
  partners: { id: string; name: string }[];
  companies: { id: string; name: string }[];
  role: 'ADMIN' | 'BROKER' | 'PARTNER' | 'COMPANY';
}

export function CalculationHistory({
  calculations,
  brokers,
  partners,
  companies,
  role,
}: CalculationHistoryProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleString('ru-RU');
  };

  const formatMoney = (amount: number, currency: string) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const columns = [
    { key: 'date', label: 'Дата' },
    { key: 'amount', label: 'Сумма' },
    { key: 'currency', label: 'Валюта' },
    { key: 'rate', label: 'Курс' },
    { key: 'commission', label: 'Комиссия' },
    { key: 'total', label: 'Итого' },
  ];

  if (role === 'ADMIN' || role === 'BROKER') {
    columns.push({ key: 'broker', label: 'Брокер' });
  }
  if (role === 'ADMIN' || role === 'BROKER' || role === 'PARTNER') {
    columns.push({ key: 'partner', label: 'Партнер' });
  }
  columns.push({ key: 'company', label: 'Компания' });

  return (
    <div className="space-y-4">
      <div className="flex justify-between gap-3">
        <Input
          className="w-full sm:max-w-[44%]"
          placeholder="Поиск..."
          startContent={<SearchIcon className="text-default-300" />}
        />
        <div className="flex gap-3">
          {role === 'ADMIN' && (
            <Dropdown>
              <DropdownTrigger>
                <Button variant="flat">
                  Брокер
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                {brokers.map((broker) => (
                  <DropdownItem key={broker.id}>
                    {broker.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          )}
          
          {(role === 'ADMIN' || role === 'BROKER') && (
            <Dropdown>
              <DropdownTrigger>
                <Button variant="flat">
                  Партнер
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                {partners.map((partner) => (
                  <DropdownItem key={partner.id}>
                    {partner.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          )}

          <Dropdown>
            <DropdownTrigger>
              <Button variant="flat">
                Компания
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              {companies.map((company) => (
                <DropdownItem key={company.id}>
                  {company.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>

      <Table aria-label="История расчетов">
        <TableHeader>
          {columns.map((column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {calculations.map((calc, index) => (
            <TableRow key={index}>
              <TableCell>{formatDate(calc.timestamp)}</TableCell>
              <TableCell>{formatMoney(calc.amount, calc.currency)}</TableCell>
              <TableCell>{calc.currency}</TableCell>
              <TableCell>{calc.exchangeRate}</TableCell>
              <TableCell>
                <div className="space-y-1">
                  {role === 'ADMIN' && (
                    <Chip size="sm" variant="flat">
                      Админ: {calc.adminCommission}%
                    </Chip>
                  )}
                  {(role === 'ADMIN' || role === 'BROKER') && (
                    <Chip size="sm" variant="flat">
                      Брокер: {calc.brokerCommission}%
                    </Chip>
                  )}
                  {(role === 'ADMIN' || role === 'BROKER' || role === 'PARTNER') && (
                    <Chip size="sm" variant="flat">
                      Партнер: {calc.partnerCommission}%
                    </Chip>
                  )}
                </div>
              </TableCell>
              <TableCell>{formatMoney(calc.totalAmount, 'RUB')}</TableCell>
              {(role === 'ADMIN' || role === 'BROKER') && (
                <TableCell>{calc.brokerName}</TableCell>
              )}
              {(role === 'ADMIN' || role === 'BROKER' || role === 'PARTNER') && (
                <TableCell>{calc.partnerName}</TableCell>
              )}
              <TableCell>{calc.companyName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
