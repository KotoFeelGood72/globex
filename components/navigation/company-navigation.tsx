'use client';

import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from '@nextui-org/react';
import { ThemeSwitch } from '@/components/theme-switch';
import { Logo } from '@/components/ui/logo';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const navigationItems = [
  {
    href: '/company/dashboard',
    label: 'Дашборд',
  },
  {
    href: '/company/calculator',
    label: 'Калькулятор',
  },
  {
    href: '/company/transfers',
    label: 'Заявки на перевод',
  },
  {
    href: '/company/settings',
    label: 'Настройки',
  },
];

export function CompanyNavigation() {
  const pathname = usePathname();

  return (
    <Navbar 
      maxWidth="full" 
      className="mb-6 fixed top-0 z-50"
      isBordered
      isBlurred
    >
      <NavbarBrand>
        <Logo />
        <p className="font-bold text-inherit">GLOBEX</p>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {navigationItems.map((item) => (
          <NavbarItem key={item.href} isActive={pathname === item.href}>
            <Link
              href={item.href}
              className={cn(
                'text-foreground/60 transition-colors',
                pathname === item.href && 'text-foreground'
              )}
            >
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem>
          <Button
            color="danger"
            variant="flat"
            onClick={() => signOut()}
          >
            Выйти
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
