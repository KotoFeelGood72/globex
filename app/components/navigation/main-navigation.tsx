'use client';

import { useSession, signOut } from "next-auth/react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";
import { ThemeSwitch } from "../theme-switch";
import { Logo } from '../brand/logo';
import { useState } from "react";
import NextLink from 'next/link';

export function MainNavigation() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Общие пункты меню для всех пользователей
  const publicMenuItems = [
    { label: "Главная", href: "/" },
    { label: "О нас", href: "/about" },
    { label: "Контакты", href: "/contact" },
  ];

  // Пункты меню для авторизованных пользователей по ролям
  const roleMenuItems = {
    admin: [
      { label: "Панель управления", href: "/admin/dashboard" },
      { label: "Пользователи", href: "/admin/users" },
      { label: "Компании", href: "/admin/companies" },
      { label: "Статистика", href: "/admin/stats" },
    ],
    broker: [
      { label: "Панель управления", href: "/broker/dashboard" },
      { label: "Тарифы", href: "/broker/rates" },
      { label: "Транзакции", href: "/broker/transactions" },
    ],
    partner: [
      { label: "Панель управления", href: "/partner/dashboard" },
      { label: "Компании", href: "/partner/companies" },
    ],
    company: [
      { label: "Панель управления", href: "/company/dashboard" },
      { label: "Транзакции", href: "/company/transactions" },
    ],
  };

  const userRole = session?.user?.role as keyof typeof roleMenuItems;
  const menuItems = session ? (roleMenuItems[userRole] || []) : publicMenuItems;

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <Navbar 
      onMenuOpenChange={setIsMenuOpen}
      isMenuOpen={isMenuOpen}
      className="bg-background/70 backdrop-blur-lg border-b border-border"
      maxWidth="full"
      position="sticky"
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
          className="sm:hidden"
        />
        <NavbarBrand as={NextLink} href="/">
          <Logo />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item, index) => (
          <NavbarItem key={index}>
            <NextLink 
              href={item.href}
              className="text-foreground hover:text-primary transition-colors"
            >
              {item.label}
            </NextLink>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>

        {!session ? (
          <>
            <NavbarItem className="hidden sm:flex">
              <Button 
                as={NextLink}
                href="/auth/signin" 
                variant="flat"
                className="min-w-[100px]"
              >
                Войти
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button 
                as={NextLink}
                href="/auth/signup" 
                color="primary"
                variant="solid"
                className="min-w-[100px]"
              >
                Регистрация
              </Button>
            </NavbarItem>
          </>
        ) : (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="primary"
                name={session.user?.name || 'User'}
                size="sm"
                src={session.user?.image || undefined}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Профиль пользователя">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Вы вошли как</p>
                <p className="font-semibold">{session.user?.email}</p>
              </DropdownItem>
              <DropdownItem key="settings" as={NextLink} href="/settings">
                Настройки
              </DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={handleSignOut}>
                Выйти
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={index}>
            <NextLink
              className="w-full text-lg py-2 text-foreground hover:text-primary"
              href={item.href}
            >
              {item.label}
            </NextLink>
          </NavbarMenuItem>
        ))}
        {!session && (
          <NavbarMenuItem>
            <NextLink
              className="w-full text-lg py-2 text-primary"
              href="/auth/signin"
            >
              Войти
            </NextLink>
          </NavbarMenuItem>
        )}
      </NavbarMenu>
    </Navbar>
  );
}
