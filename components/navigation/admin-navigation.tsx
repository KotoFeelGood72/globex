'use client';

import { NavigationMenu } from '@/components/ui/navigation-menu';
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import Link from 'next/link';

export function AdminNavigation() {
  return (
    <NavigationMenu>
      <Link href="/admin/dashboard" className={navigationMenuTriggerStyle()}>
        Дашборд
      </Link>
      <Link href="/admin/calculator" className={navigationMenuTriggerStyle()}>
        Калькулятор
      </Link>
      <Link href="/admin/brokers" className={navigationMenuTriggerStyle()}>
        Брокеры
      </Link>
      <Link href="/admin/partners" className={navigationMenuTriggerStyle()}>
        Партнеры
      </Link>
      <Link href="/admin/companies" className={navigationMenuTriggerStyle()}>
        Компании
      </Link>
      <Link href="/admin/transfers" className={navigationMenuTriggerStyle()}>
        Заявки на перевод
      </Link>
      <Link href="/admin/settings" className={navigationMenuTriggerStyle()}>
        Настройки
      </Link>
    </NavigationMenu>
  );
}
