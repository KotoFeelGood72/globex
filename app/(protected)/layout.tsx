'use client';

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { usePathname } from "next/navigation";
import { Providers } from '@/components/providers';
import { AdminNavigation } from '@/components/navigation/admin-navigation';
import { BrokerNavigation } from '@/components/navigation/broker-navigation';
import { PartnerNavigation } from '@/components/navigation/partner-navigation';
import { CompanyNavigation } from '@/components/navigation/company-navigation';

type UserRole = 'admin' | 'broker' | 'partner' | 'company';

// Маппинг ролей на их дашборды
const ROLE_DASHBOARDS = {
  admin: "/admin/dashboard",
  broker: "/broker/dashboard",
  partner: "/partner/dashboard",
  company: "/company/dashboard"
} as const;

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth/signin");
    },
  });

  const pathname = usePathname();

  if (status === "loading") {
    return null;
  }

  const role = session?.user?.role?.toLowerCase() as UserRole;
  if (!role || !ROLE_DASHBOARDS[role]) {
    redirect("/auth/signin");
  }

  // Если это корневой путь или /dashboard, перенаправляем на дашборд роли
  if (pathname === "/" || pathname === "/dashboard") {
    redirect(ROLE_DASHBOARDS[role]);
  }

  // Проверяем, имеет ли пользователь доступ к текущему разделу
  const allowedPrefix = `/${role}`;
  if (!pathname.startsWith(allowedPrefix)) {
    redirect(ROLE_DASHBOARDS[role]);
  }

  const getNavigation = () => {
    switch (session?.user?.role) {
      case 'admin':
        return <AdminNavigation />;
      case 'broker':
        return <BrokerNavigation />;
      case 'partner':
        return <PartnerNavigation />;
      case 'company':
        return <CompanyNavigation />;
      default:
        return null;
    }
  };

  return (
    <Providers>
      {getNavigation()}
      <main className="pt-24 min-h-screen bg-background">
        <div className="flex-1">
          {children}
        </div>
      </main>
    </Providers>
  );
}
