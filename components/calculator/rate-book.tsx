'use client';

import { useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useExchangeRates } from '@/lib/exchange-rates';

export function RateBook() {
  const { rates, isLoading, updateRates } = useExchangeRates();

  // Обновление курсов каждые 10 секунд
  useEffect(() => {
    updateRates();
    const interval = setInterval(updateRates, 10000);
    return () => clearInterval(interval);
  }, [updateRates]);

  const currencyPairs = ['USD/RUB', 'EUR/RUB', 'CNY/RUB'];

  return (
    <Card className="w-full mx-2">
      <CardHeader>
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold">Курсы валют</h3>
          {isLoading && (
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Пара</TableHead>
              <TableHead className="text-right">Курс</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currencyPairs.map((pair) => {
              const [base] = pair.split('/');
              const rate = rates[base]?.rate || 0;
              return (
                <TableRow key={pair}>
                  <TableCell className="font-medium">{pair}</TableCell>
                  <TableCell className="text-right">
                    {rate.toFixed(4)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
