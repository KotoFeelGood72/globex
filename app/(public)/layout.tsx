'use client';

import { PublicNavigation } from '@/components/navigation/public-navigation';
import { Toaster } from '@/components/ui/toaster';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
      <PublicNavigation />
      <main>
        {children}
      </main>
      <Toaster />
    </div>
  );
}
