'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { ExchangeRateSource } from '@/types/calculator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';

interface CurrencySelectorProps {
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

export function CurrencySelector({
  sources,
  selectedSourceId,
  fromCurrency,
  toCurrency,
  amount,
  onSourceChange,
  onFromCurrencyChange,
  onToCurrencyChange,
  onAmountChange,
}: CurrencySelectorProps) {
  const selectedSource = sources.find(s => s.id === selectedSourceId);

  // Моковые данные для курсов из разных источников
  const mockRates = {
    binance: {
      buy: 97.45,
      sell: 97.55,
      spread: 0.10,
      volume24h: '1.2M USDT',
      lastUpdate: new Date().toLocaleTimeString('ru-RU'),
    },
    huobi: {
      buy: 97.42,
      sell: 97.58,
      spread: 0.16,
      volume24h: '800K USDT',
      lastUpdate: new Date().toLocaleTimeString('ru-RU'),
    },
    bybit: {
      buy: 97.40,
      sell: 97.52,
      spread: 0.12,
      volume24h: '950K USDT',
      lastUpdate: new Date().toLocaleTimeString('ru-RU'),
    },
  };

  // Моковые данные для курсов ЦБ РФ и Investing.com
  const officialRates = [
    {
      pair: 'USD/RUB',
      cbr: 91.5000,
      investing: 91.8000,
      difference: 0.33,
    },
    {
      pair: 'EUR/RUB',
      cbr: 98.7000,
      investing: 99.1000,
      difference: 0.41,
    },
    {
      pair: 'CNY/RUB',
      cbr: 12.8000,
      investing: 12.7500,
      difference: -0.39,
    },
  ];

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

            {/* Таблица официальных курсов */}
            <div className="space-y-4">
              <h4 className="font-medium">Официальные курсы валют</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Валютная пара</TableHead>
                    <TableHead className="text-right">Курс ЦБ РФ</TableHead>
                    <TableHead className="text-right">Курс Investing.com</TableHead>
                    <TableHead className="text-right">Разница</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {officialRates.map((rate) => (
                    <TableRow key={rate.pair}>
                      <TableCell>{rate.pair}</TableCell>
                      <TableCell className="text-right">{rate.cbr.toFixed(4)}</TableCell>
                      <TableCell className="text-right">{rate.investing.toFixed(4)}</TableCell>
                      <TableCell className="text-right">
                        <span className={`flex items-center justify-end ${rate.difference > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {rate.difference > 0 ? (
                            <ArrowUpIcon className="w-4 h-4 mr-1" />
                          ) : (
                            <ArrowDownIcon className="w-4 h-4 mr-1" />
                          )}
                          {Math.abs(rate.difference).toFixed(2)}%
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {selectedSource && (
            <div className="space-y-4">
              <h4 className="font-medium">Курсы {selectedSource.name}</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Операция</TableHead>
                    <TableHead className="text-right">Курс</TableHead>
                    <TableHead className="text-right">Объем (24ч)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedSource.id === 'binance' && (
                    <>
                      <TableRow>
                        <TableCell>Покупка</TableCell>
                        <TableCell className="text-right">{mockRates.binance.buy}</TableCell>
                        <TableCell className="text-right" rowSpan={2}>{mockRates.binance.volume24h}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Продажа</TableCell>
                        <TableCell className="text-right">{mockRates.binance.sell}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Спред</TableCell>
                        <TableCell className="text-right">{mockRates.binance.spread}</TableCell>
                        <TableCell className="text-right text-sm text-muted-foreground">
                          Обновлено: {mockRates.binance.lastUpdate}
                        </TableCell>
                      </TableRow>
                    </>
                  )}
                  {selectedSource.id === 'huobi' && (
                    <>
                      <TableRow>
                        <TableCell>Покупка</TableCell>
                        <TableCell className="text-right">{mockRates.huobi.buy}</TableCell>
                        <TableCell className="text-right" rowSpan={2}>{mockRates.huobi.volume24h}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Продажа</TableCell>
                        <TableCell className="text-right">{mockRates.huobi.sell}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Спред</TableCell>
                        <TableCell className="text-right">{mockRates.huobi.spread}</TableCell>
                        <TableCell className="text-right text-sm text-muted-foreground">
                          Обновлено: {mockRates.huobi.lastUpdate}
                        </TableCell>
                      </TableRow>
                    </>
                  )}
                  {selectedSource.id === 'bybit' && (
                    <>
                      <TableRow>
                        <TableCell>Покупка</TableCell>
                        <TableCell className="text-right">{mockRates.bybit.buy}</TableCell>
                        <TableCell className="text-right" rowSpan={2}>{mockRates.bybit.volume24h}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Продажа</TableCell>
                        <TableCell className="text-right">{mockRates.bybit.sell}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Спред</TableCell>
                        <TableCell className="text-right">{mockRates.bybit.spread}</TableCell>
                        <TableCell className="text-right text-sm text-muted-foreground">
                          Обновлено: {mockRates.bybit.lastUpdate}
                        </TableCell>
                      </TableRow>
                    </>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
