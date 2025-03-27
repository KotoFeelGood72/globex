"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import { ThemeSwitch } from "../theme-switch";
import { useSession } from "next-auth/react";
import { useState } from "react";

export function MainNavbar() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const publicMenuItems = [
    { label: "Главная", href: "/" },
    { label: "О нас", href: "/about" },
    { label: "Контакты", href: "/contact" },
  ];

  const protectedMenuItems = {
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

  const userRole = session?.user?.role || "public";
  const menuItems = session
    ? protectedMenuItems[userRole as keyof typeof protectedMenuItems]
    : publicMenuItems;

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      isMenuOpen={isMenuOpen}
      className="bg-background/70 backdrop-blur-lg"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-inherit">GLOBEX</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item, index) => (
          <NavbarItem key={index}>
            <Link
              color="foreground"
              href={item.href}
              className="hover:text-primary"
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
        {!session ? (
          <>
            <NavbarItem>
              <Button
                as={Link}
                color="primary"
                href="/auth/signin"
                variant="flat"
              >
                Войти
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                as={Link}
                color="primary"
                href="/auth/signup"
                variant="solid"
              >
                Регистрация
              </Button>
            </NavbarItem>
          </>
        ) : (
          <NavbarItem>
            <Button color="danger" variant="flat" onClick={() => signOut()}>
              Выйти
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={index}>
            <Link
              color="foreground"
              className="w-full"
              href={item.href}
              size="lg"
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
