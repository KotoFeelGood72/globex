"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface NavItem {
  title: string;
  href: string;
  roles: string[];
}

const navItems: NavItem[] = [
  {
    title: "Дашборд",
    href: "/(protected)/dashboard",
    roles: ["admin", "partner", "company"],
  },
  {
    title: "Калькулятор",
    href: "/(protected)/calculator",
    roles: ["admin", "partner", "company"],
  },
  {
    title: "Компании",
    href: "/(protected)/admin/companies",
    roles: ["admin"],
  },
  {
    title: "Партнеры",
    href: "/(protected)/admin/partners",
    roles: ["admin"],
  },
  {
    title: "Транзакции",
    href: "/(protected)/admin/transactions",
    roles: ["admin"],
  },
  {
    title: "Мои компании",
    href: "/(protected)/partner/companies",
    roles: ["partner"],
  },
  {
    title: "История операций",
    href: "/(protected)/partner/transactions",
    roles: ["partner"],
  },
  {
    title: "История операций",
    href: "/(protected)/company/transactions",
    roles: ["company"],
  },
];

function NavLinks() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const userRole = session?.user?.role;

  const filteredNavItems = navItems.filter((item) =>
    item.roles.includes(userRole as string)
  );

  return (
    <>
      {filteredNavItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === item.href
              ? "text-foreground"
              : "text-muted-foreground"
          )}
        >
          {item.title}
        </Link>
      ))}
    </>
  );
}

export function Nav() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        {/* Мобильная навигация */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Открыть меню</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <SheetHeader>
              <SheetTitle>Навигация</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col space-y-4 mt-4">
              <NavLinks />
            </nav>
          </SheetContent>
        </Sheet>

        <div className="flex items-center">
          <Logo />
          {/* Десктопная навигация */}
          <nav className="hidden md:flex items-center space-x-6 ml-6">
            <NavLinks />
          </nav>
        </div>
      </div>
    </div>
  );
}
