'use client';

import { Card, CardBody, Chip } from '@nextui-org/react';
import { formatDateTime, formatShortMoney } from '@/lib/format';
import { 
  ArrowTrendingUpIcon, 
  ArrowTrendingDownIcon,
  ClockIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

interface BankAccount {
  bank: string;
  shortName: string;
  currency: string;
  balance: number;
  limit: number;
  type: 'local' | 'foreign' | 'crypto';
  lastUpdate: string;
  lastTransaction: string;
  incomingToday: number;
  outgoingToday: number;
}

interface Props {
  account: BankAccount;
}

export function LiquidityMeter({ account }: Props) {
  const percentage = Math.min((account.balance / account.limit) * 100, 100);
  const isLow = percentage < 20;
  const isMedium = percentage >= 20 && percentage < 50;

  // Более яркие цвета для стаканов
  const bgColorClass = isLow 
    ? 'bg-gradient-to-t from-danger/50 to-danger/20' 
    : isMedium 
    ? 'bg-gradient-to-t from-warning/50 to-warning/20' 
    : 'bg-gradient-to-t from-success/50 to-success/20';

  const liquidityColor = isLow ? 'text-danger' : isMedium ? 'text-warning' : 'text-success';

  return (
    <Card className="bg-content1/50 backdrop-blur-sm border border-default-100">
      <CardBody className="gap-4">
        {/* Заголовок */}
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <h3 className="text-xl font-bold tracking-tight">{account.bank}</h3>
            <div className="flex gap-2 mt-1">
              <Chip 
                size="sm" 
                variant="flat"
                classNames={{
                  base: "bg-default-100 px-2",
                  content: "font-medium text-default-600"
                }}
              >
                {account.currency}
              </Chip>
              <Chip
                variant="flat"
                color="secondary"
                size="sm"
                classNames={{
                  base: "bg-secondary/10 px-2",
                  content: "font-medium text-secondary"
                }}
              >
                {account.type === 'local' ? 'Локальный' : 
                 account.type === 'foreign' ? 'Иностранный' : 
                 'Криптокошелек'}
              </Chip>
            </div>
          </div>
        </div>

        {/* Стакан с уровнем ликвидности */}
        <div className="relative h-[120px] flex flex-col justify-end">
          <div className="absolute inset-0 border border-default-200 rounded-lg overflow-hidden bg-black/40">
            <div
              className={`absolute bottom-0 left-0 right-0 transition-all duration-500 ${bgColorClass}`}
              style={{ height: `${percentage}%` }}
            />
            {/* Линии уровней */}
            <div className="absolute inset-0 flex flex-col justify-between">
              <div className="h-px bg-default-200/30 relative">
                <span className="absolute right-1 text-[11px] text-default-500">100%</span>
              </div>
              <div className="h-px bg-default-200/30 relative">
                <span className="absolute right-1 text-[11px] text-default-500">75%</span>
              </div>
              <div className="h-px bg-default-200/30 relative">
                <span className="absolute right-1 text-[11px] text-default-500">50%</span>
              </div>
              <div className="h-px bg-default-200/30 relative">
                <span className="absolute right-1 text-[11px] text-default-500">25%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Баланс и лимит */}
        <div className="space-y-1">
          <div className="text-sm text-default-500">Баланс</div>
          <div className="flex justify-between items-baseline">
            <div className={`text-2xl font-bold tracking-tight ${liquidityColor}`}>
              {formatShortMoney(account.balance, account.currency)}
            </div>
            <div className="text-sm text-default-500">
              Лимит: {formatShortMoney(account.limit, account.currency)}
            </div>
          </div>
        </div>

        {/* Входящие и исходящие */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center gap-1 text-sm text-default-500 mb-1">
              <ArrowTrendingUpIcon className="w-4 h-4 text-success" />
              <span>Приход сегодня</span>
            </div>
            <div className="text-success font-medium">
              +{formatShortMoney(account.incomingToday, account.currency)}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1 text-sm text-default-500 mb-1">
              <ArrowTrendingDownIcon className="w-4 h-4 text-danger" />
              <span>Расход сегодня</span>
            </div>
            <div className="text-danger font-medium">
              -{formatShortMoney(account.outgoingToday, account.currency)}
            </div>
          </div>
        </div>

        {/* Время обновления */}
        <div className="flex justify-between items-center pt-2 text-xs text-default-500 border-t border-default-200/30">
          <div className="flex items-center gap-1.5">
            <ClockIcon className="w-3.5 h-3.5" />
            <div>
              <div>Обновлено</div>
              <div>{formatDateTime(account.lastUpdate)}</div>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <ArrowPathIcon className="w-3.5 h-3.5" />
            <div>
              <div>Последняя операция</div>
              <div>{formatDateTime(account.lastTransaction)}</div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
