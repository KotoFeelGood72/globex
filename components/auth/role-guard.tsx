'use client';

import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

interface RoleGuardProps {
  children: React.ReactNode;
}

export function RoleGuard({ children }: RoleGuardProps) {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      window.location.href = '/auth/signin';
    },
  });
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === 'loading') return;

    // Проверяем роль пользователя для текущего пути
    let requiredRole = '';
    if (pathname.startsWith('/admin')) {
      requiredRole = 'admin';
    } else if (pathname.startsWith('/broker')) {
      requiredRole = 'broker';
    } else if (pathname.startsWith('/partner')) {
      requiredRole = 'partner';
    } else if (pathname.startsWith('/company')) {
      requiredRole = 'company';
    }

    if (requiredRole && session?.user?.role !== requiredRole) {
      window.location.href = '/dashboard';
    }
  }, [session, status, pathname]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return <>{children}</>;
}
