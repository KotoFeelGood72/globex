'use client';

import {
  Card,
  CardBody,
  CardHeader,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
} from '@nextui-org/react';

interface ExchangeRate {
  currency: string;
  cbr: number;
  investing: number;
  lastUpdate: string;
  difference: number;
}

interface ExchangeRatesWidgetProps {
  rates: ExchangeRate[];
}

export function ExchangeRatesWidget({ rates }: ExchangeRatesWidgetProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatRate = (rate: number) => {
    return rate.toFixed(4);
  };

  const getDifferenceColor = (diff: number) => {
    if (diff > 0) return "success";
    if (diff < 0) return "danger";
    return "default";
  };

  const formatDifference = (diff: number) => {
    const sign = diff > 0 ? '+' : '';
    return `${sign}${diff.toFixed(2)}%`;
  };

  return (
    <Card>
      <CardHeader className="flex justify-between">
        <h3 className="text-lg font-bold">Курсы валют</h3>
        <div className="text-small text-default-500">
          Последнее обновление: {formatDate(rates[0]?.lastUpdate)}
        </div>
      </CardHeader>
      <CardBody>
        <Table aria-label="Таблица курсов валют">
          <TableHeader>
            <TableColumn>Валюта</TableColumn>
            <TableColumn>ЦБР</TableColumn>
            <TableColumn>Investing</TableColumn>
            <TableColumn>Разница</TableColumn>
          </TableHeader>
          <TableBody>
            {rates.map((rate) => (
              <TableRow key={rate.currency}>
                <TableCell>
                  <div className="font-medium">{rate.currency}</div>
                </TableCell>
                <TableCell>{formatRate(rate.cbr)}</TableCell>
                <TableCell>{formatRate(rate.investing)}</TableCell>
                <TableCell>
                  <Chip
                    size="sm"
                    color={getDifferenceColor(rate.difference)}
                    variant="flat"
                  >
                    {formatDifference(rate.difference)}
                  </Chip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  );
}
