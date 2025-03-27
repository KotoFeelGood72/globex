'use client';

import { SessionProvider } from 'next-auth/react';
import { Providers } from './providers';

export function RootProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Providers>{children}</Providers>
    </SessionProvider>
  );
}
