'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { ExchangeRateSource } from '@/types/calculator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface CurrencyRatesProps {
  sources: ExchangeRateSource[];
  selectedSourceId: string;
  fromCurrency: string;
  toCurrency: string;
  amount: string;
  onSourceChange: (sourceId: string) => void;
  onFromCurrencyChange: (currency: string) => void;
  onToCurrencyChange: (currency: string) => void;
  onAmountChange: (amount: string) => void;
}

export function CurrencyRates({
  sources,
  selectedSourceId,
  fromCurrency,
  toCurrency,
  amount,
  onSourceChange,
  onFromCurrencyChange,
  onToCurrencyChange,
  onAmountChange,
}: CurrencyRatesProps) {
  const selectedSource = sources.find(s => s.id === selectedSourceId);

  // Моковые данные для P2P курсов
  const p2pRates = {
    buy: 97.45,
    sell: 97.55,
    spread: 0.10,
    volume24h: '1.2M USDT',
    lastUpdate: new Date().toLocaleTimeString('ru-RU'),
  };

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Источник курса</Label>
                <Select value={selectedSourceId} onValueChange={onSourceChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Выберите источник" />
                  </SelectTrigger>
                  <SelectContent>
                    {sources.map(source => (
                      <SelectItem key={source.id} value={source.id}>
                        {source.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Исходная валюта</Label>
                  <Select value={fromCurrency} onValueChange={onFromCurrencyChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Из" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedSource?.currencies.from.map(currency => (
                        <SelectItem key={currency} value={currency}>
                          {currency}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Целевая валюта</Label>
                  <Select value={toCurrency} onValueChange={onToCurrencyChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="В" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedSource?.currencies.to.map(currency => (
                        <SelectItem key={currency} value={currency}>
                          {currency}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Сумма</Label>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => onAmountChange(e.target.value)}
                  placeholder="Введите сумму"
                  className="w-full"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Текущие курсы P2P</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Операция</TableHead>
                  <TableHead className="text-right">Курс</TableHead>
                  <TableHead className="text-right">Объем (24ч)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Покупка</TableCell>
                  <TableCell className="text-right">{p2pRates.buy}</TableCell>
                  <TableCell className="text-right" rowSpan={2}>{p2pRates.volume24h}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Продажа</TableCell>
                  <TableCell className="text-right">{p2pRates.sell}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Спред</TableCell>
                  <TableCell className="text-right">{p2pRates.spread}</TableCell>
                  <TableCell className="text-right text-sm text-muted-foreground">
                    Обновлено: {p2pRates.lastUpdate}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
