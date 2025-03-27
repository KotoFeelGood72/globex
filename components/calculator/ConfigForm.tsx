'use client';

import { useState } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Button,
  Switch,
  Textarea,
} from '@nextui-org/react';

export function ConfigForm() {
  const [config, setConfig] = useState({
    defaultFromCurrency: 'USD',
    defaultToCurrency: 'KGS',
    autoUpdateRates: true,
    updateInterval: '60',
    apiKey: '',
    allowedCurrencies: 'USD,EUR,KGS,RUB,KZT',
    rateMargin: '2',
    notificationEmail: '',
    alertThreshold: '5',
  });

  const handleChange = (key: string, value: string | boolean) => {
    setConfig((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет логика сохранения конфигурации
    console.log('Сохранение конфигурации:', config);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-sm">
          <CardHeader>
            <h2 className="text-lg font-semibold">Основные настройки</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <Input
              label="Валюта по умолчанию (из)"
              placeholder="USD"
              value={config.defaultFromCurrency}
              onChange={(e) => handleChange('defaultFromCurrency', e.target.value)}
            />

            <Input
              label="Валюта по умолчанию (в)"
              placeholder="KGS"
              value={config.defaultToCurrency}
              onChange={(e) => handleChange('defaultToCurrency', e.target.value)}
            />

            <Textarea
              label="Разрешенные валюты"
              placeholder="Введите коды валют через запятую"
              value={config.allowedCurrencies}
              onChange={(e) => handleChange('allowedCurrencies', e.target.value)}
            />

            <Input
              type="number"
              label="Маржа (%)"
              placeholder="2"
              value={config.rateMargin}
              onChange={(e) => handleChange('rateMargin', e.target.value)}
            />
          </CardBody>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <h2 className="text-lg font-semibold">Автоматическое обновление</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Автообновление курсов</p>
                <p className="text-sm text-muted-foreground">
                  Включить автоматическое обновление курсов
                </p>
              </div>
              <Switch
                checked={config.autoUpdateRates}
                onChange={(e) => handleChange('autoUpdateRates', e.target.checked)}
              />
            </div>

            <Input
              type="number"
              label="Интервал обновления (минуты)"
              placeholder="60"
              value={config.updateInterval}
              onChange={(e) => handleChange('updateInterval', e.target.value)}
            />

            <Input
              type="password"
              label="API ключ"
              placeholder="Введите API ключ"
              value={config.apiKey}
              onChange={(e) => handleChange('apiKey', e.target.value)}
            />

            <Input
              type="email"
              label="Email для уведомлений"
              placeholder="admin@example.com"
              value={config.notificationEmail}
              onChange={(e) => handleChange('notificationEmail', e.target.value)}
            />

            <Input
              type="number"
              label="Порог оповещения (%)"
              placeholder="5"
              value={config.alertThreshold}
              onChange={(e) => handleChange('alertThreshold', e.target.value)}
              description="Отправлять уведомление при изменении курса более чем на указанный процент"
            />
          </CardBody>
        </Card>

        <div className="md:col-span-2">
          <Button
            type="submit"
            color="primary"
            className="w-full"
          >
            Сохранить настройки
          </Button>
        </div>
      </div>
    </form>
  );
}
