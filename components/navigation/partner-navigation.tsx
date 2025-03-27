'use client';

import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  NavbarMenu,
} from '@nextui-org/react';
import { ThemeSwitch } from '@/components/theme-switch';
import { Logo } from '@/components/ui/logo';
import { cn } from '@/lib/utils';

const navigationItems = [
  { href: '/partner/dashboard', label: 'Дашборд' },
  { href: '/partner/calculator', label: 'Калькулятор' },
  { href: '/partner/companies', label: 'Компании' },
  { href: '/partner/transfers', label: 'Заявки на перевод' },
  { href: '/partner/settings', label: 'Настройки' },
];

export function PartnerNavigation() {
  const pathname = usePathname();

  return (
    <Navbar
      isBordered
      classNames={{
        wrapper: "max-w-7xl mx-auto px-4 md:px-6 lg:px-8",
      }}
    >
      <NavbarContent justify="start">
        <NavbarBrand as="div" className="gap-2.5">
          <div onClick={() => window.location.href = '/partner/dashboard'} className="cursor-pointer">
            <Logo />
          </div>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <nav className="flex gap-4">
          {navigationItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
                pathname === item.href
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-accent hover:text-accent-foreground'
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem>
          <Button
            color="danger"
            variant="flat"
            onPress={() => signOut()}
          >
            Выйти
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        <nav className="flex flex-col gap-2">
          {navigationItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
                pathname === item.href
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-accent hover:text-accent-foreground'
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </NavbarMenu>
    </Navbar>
  );
}
