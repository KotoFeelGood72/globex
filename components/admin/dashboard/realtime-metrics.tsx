'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";
import { TrendingUp, TrendingDown } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  description: string;
  icon: keyof typeof Icons;
  trend: 'up' | 'down';
  percentage: string;
}

const MetricCard = ({ title, value, description, icon: Icon, trend, percentage }: MetricCardProps) => {
  const IconComponent = Icons[Icon];
  const TrendIcon = trend === 'up' ? TrendingUp : TrendingDown;
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <IconComponent className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        <div className="mt-2 flex items-center text-xs">
          <TrendIcon className={`mr-1 h-4 w-4 ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`} />
          <span className={trend === 'up' ? 'text-green-500' : 'text-red-500'}>{percentage}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export function RealtimeMetrics() {
  const metrics = [
    {
      title: "Активные пользователи",
      value: "2,350",
      description: "Онлайн в данный момент",
      icon: "users" as const,
      trend: "up" as const,
      percentage: "+12.3%"
    },
    {
      title: "Транзакции",
      value: "456",
      description: "За последний час",
      icon: "creditCard" as const,
      trend: "up" as const,
      percentage: "+8.1%"
    },
    {
      title: "Объем обмена",
      value: "$12.4M",
      description: "За последние 24 часа",
      icon: "calculator" as const,
      trend: "down" as const,
      percentage: "-2.5%"
    },
    {
      title: "Новые компании",
      value: "12",
      description: "За последние 24 часа",
      icon: "building" as const,
      trend: "up" as const,
      percentage: "+4.9%"
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <MetricCard key={metric.title} {...metric} />
      ))}
    </div>
  );
}
