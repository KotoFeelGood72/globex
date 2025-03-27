import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Регистрация',
  description: 'Создайте аккаунт в GlobexPay',
};

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="relative z-10 w-full max-w-[450px] px-4">
        {children}
      </div>
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-background via-background/80 to-background/40" />
    </div>
  );
}
