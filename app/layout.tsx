import './globals.css';
import './no-flash.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { RootProviders } from '@/components/root-providers';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  title: 'GLOBEX - Экспертный консалтинг международных платежей',
  description: 'Помогаем бизнесу выстроить эффективные платёжные решения для работы с Китаем, Европой, США и другими странами.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                document.documentElement.classList.add('loading');
                window.addEventListener('load', function() {
                  document.documentElement.classList.remove('loading');
                });
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <RootProviders>
          {children}
        </RootProviders>
      </body>
    </html>
  );
}
