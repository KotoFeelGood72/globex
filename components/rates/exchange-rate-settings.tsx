'use client';

import { useState } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Select,
  SelectItem,
  Switch,
  Button,
  Tooltip,
} from '@nextui-org/react';
import { RefreshIcon } from '@/components/icons/refresh-icon';

interface ExchangeRateSettingsProps {
  onSourceChange: (source: string) => void;
  onRateChange: (currency: string, rate: number) => void;
  onAutoUpdateChange: (enabled: boolean) => void;
  onIntervalChange: (minutes: number) => void;
  currentSettings: {
    source: string;
    rates: {
      currency: string;
      rate: number;
      lastUpdate: string;
    }[];
    autoUpdate: boolean;
    updateInterval: number;
  };
}

export function ExchangeRateSettings({
  onSourceChange,
  onRateChange,
  onAutoUpdateChange,
  onIntervalChange,
  currentSettings,
}: ExchangeRateSettingsProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Здесь будет логика обновления курсов
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Настройки курсов валют</h3>
      </CardHeader>
      <CardBody className="space-y-4">
        <div className="flex justify-between items-center">
          <Select
            label="Источник курсов"
            value={currentSettings.source}
            onChange={(e) => onSourceChange(e.target.value)}
          >
            <SelectItem key="CBR" value="CBR">ЦБ РФ</SelectItem>
            <SelectItem key="Investing" value="Investing">Investing.com</SelectItem>
          </Select>
          <Tooltip content="Обновить курсы">
            <Button
              isIconOnly
              color="primary"
              onPress={handleRefresh}
              isLoading={isRefreshing}
            >
              <RefreshIcon />
            </Button>
          </Tooltip>
        </div>

        <div className="grid gap-4">
          {currentSettings.rates.map((rate) => (
            <div key={rate.currency} className="flex items-center gap-4">
              <Input
                type="number"
                label={`Курс ${rate.currency}`}
                value={rate.rate.toString()}
                onChange={(e) => onRateChange(rate.currency, parseFloat(e.target.value))}
                endContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">
                      {new Date(rate.lastUpdate).toLocaleTimeString('ru-RU')}
                    </span>
                  </div>
                }
              />
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <Switch
            isSelected={currentSettings.autoUpdate}
            onValueChange={onAutoUpdateChange}
          >
            Автоматическое обновление
          </Switch>
          {currentSettings.autoUpdate && (
            <Input
              type="number"
              label="Интервал обновления (мин)"
              value={currentSettings.updateInterval.toString()}
              onChange={(e) => onIntervalChange(parseInt(e.target.value))}
              className="w-40"
            />
          )}
        </div>
      </CardBody>
    </Card>
  );
}
