'use client';

import { usePathname } from 'next/navigation';
import { MainNavigation } from './main-navigation';

export function NavigationWrapper() {
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith('/auth/');

  if (isAuthPage) {
    return null;
  }

  return <MainNavigation />;
}
