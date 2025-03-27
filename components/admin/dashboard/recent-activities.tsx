'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Activity {
  id: string;
  user: {
    name: string;
    image?: string;
  };
  action: string;
  target: string;
  timestamp: string;
}

const activities: Activity[] = [
  {
    id: '1',
    user: {
      name: 'Анна М.',
      image: '/avatars/01.png',
    },
    action: 'создала новую транзакцию',
    target: 'USD/EUR',
    timestamp: '2 минуты назад',
  },
  {
    id: '2',
    user: {
      name: 'Иван П.',
      image: '/avatars/02.png',
    },
    action: 'обновил профиль брокера',
    target: 'Профиль #1234',
    timestamp: '5 минут назад',
  },
  {
    id: '3',
    user: {
      name: 'Мария С.',
    },
    action: 'добавила новую компанию',
    target: 'ООО "Глобекс"',
    timestamp: '10 минут назад',
  },
  {
    id: '4',
    user: {
      name: 'Петр К.',
      image: '/avatars/03.png',
    },
    action: 'изменил статус транзакции',
    target: 'TX-789',
    timestamp: '15 минут назад',
  },
  {
    id: '5',
    user: {
      name: 'Елена В.',
    },
    action: 'обновила курс валют',
    target: 'EUR/RUB',
    timestamp: '20 минут назад',
  },
  {
    id: '6',
    user: {
      name: 'Александр Д.',
      image: '/avatars/04.png',
    },
    action: 'создал новый отчет',
    target: 'Отчет за Q4',
    timestamp: '25 минут назад',
  },
];

export function RecentActivities() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Последние действия</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 rounded-lg border p-4">
                <Avatar>
                  {activity.user.image ? (
                    <AvatarImage src={activity.user.image} alt={activity.user.name} />
                  ) : (
                    <AvatarFallback>
                      {activity.user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {activity.user.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {activity.action} <span className="font-medium">{activity.target}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {activity.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
