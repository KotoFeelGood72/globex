'use client';

import { useSession, signOut } from 'next-auth/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import Link from 'next/link';

const roleNames = {
  admin: 'Администратор',
  broker: 'Брокер',
  partner: 'Партнер',
  company: 'Компания',
};

const roleLinks = {
  admin: [
    { name: 'Дашборд', href: '/admin/dashboard' },
    { name: 'Пользователи', href: '/admin/users' },
    { name: 'Компании', href: '/admin/companies' },
    { name: 'Статистика', href: '/admin/stats' },
  ],
  broker: [
    { name: 'Дашборд', href: '/broker/dashboard' },
    { name: 'Тарифы', href: '/broker/rates' },
    { name: 'Транзакции', href: '/broker/transactions' },
  ],
  partner: [
    { name: 'Дашборд', href: '/partner/dashboard' },
    { name: 'Компании', href: '/partner/companies' },
  ],
  company: [
    { name: 'Дашборд', href: '/company/dashboard' },
    { name: 'Транзакции', href: '/company/transactions' },
  ],
};

export function UserNav() {
  const { data: session } = useSession();
  const role = session?.user?.role.toLowerCase() as keyof typeof roleLinks;
  const links = roleLinks[role] || [];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <User className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{session?.user?.name}</p>
            <p className="text-xs text-muted-foreground">{roleNames[role]}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {links.map((link) => (
          <DropdownMenuItem key={link.href} asChild>
            <Link href={link.href}>{link.name}</Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-600 dark:text-red-400"
          onClick={() => signOut()}
        >
          Выйти
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
