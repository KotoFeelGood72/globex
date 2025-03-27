'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Info, AlertCircle } from "lucide-react";

interface SystemAlert {
  id: string;
  title: string;
  description: string;
  type: 'info' | 'warning' | 'error';
  timestamp: string;
}

const getAlertVariant = (type: SystemAlert['type']) => {
  switch (type) {
    case 'error':
      return 'destructive';
    case 'warning':
      return 'default';
    case 'info':
      return 'default';
    default:
      return 'default';
  }
};

const getAlertIcon = (type: SystemAlert['type']) => {
  switch (type) {
    case 'error':
      return AlertCircle;
    case 'warning':
      return AlertTriangle;
    case 'info':
      return Info;
    default:
      return Info;
  }
};

const alerts: SystemAlert[] = [
  {
    id: '1',
    title: 'Высокая нагрузка на сервер',
    description: 'Наблюдается повышенная нагрузка на основной сервер. Рекомендуется мониторинг производительности.',
    type: 'warning',
    timestamp: '2 минуты назад'
  },
  {
    id: '2',
    title: 'Обновление системы',
    description: 'Запланировано обновление системы в 02:00 МСК. Ожидаемое время простоя: 15 минут.',
    type: 'info',
    timestamp: '15 минут назад'
  },
  {
    id: '3',
    title: 'Ошибка API',
    description: 'Зафиксированы ошибки в работе API платежного шлюза. Технические специалисты уже работают над решением.',
    type: 'error',
    timestamp: '1 час назад'
  }
];

export function SystemAlerts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Системные уведомления</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.map((alert) => {
          const Icon = getAlertIcon(alert.type);
          return (
            <Alert key={alert.id} variant={getAlertVariant(alert.type)}>
              <Icon className="h-4 w-4" />
              <AlertTitle>{alert.title}</AlertTitle>
              <AlertDescription>
                {alert.description}
                <div className="mt-2 text-xs text-muted-foreground">{alert.timestamp}</div>
              </AlertDescription>
            </Alert>
          );
        })}
      </CardContent>
    </Card>
  );
}
