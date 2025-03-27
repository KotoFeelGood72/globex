'use client';

import { Logo } from '@/components/ui/logo';
import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Хедер */}
      <header className="w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex h-14 items-center">
            <Link href="http://localhost:4000" className="flex items-center space-x-2">
              <Logo />
            </Link>
          </div>
        </div>
      </header>

      {/* Основной контент */}
      <main className="flex-1 flex items-center justify-center px-4 py-6 md:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-6">
          {children}
        </div>
      </main>

      {/* Футер */}
      <footer className="py-6 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} ОсОО "Нейст Компани". Все права защищены.
      </footer>
    </div>
  );
}
