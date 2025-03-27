import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { BrokerNavigation } from '@/components/navigation/broker-navigation';

interface Props {
  children: React.ReactNode;
}

export default async function BrokerLayout({ children }: Props) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/auth/signin');
  }

  if (session.user.role !== 'broker') {
    redirect('/');
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <BrokerNavigation />
      <main className="flex-1 px-4 py-6 md:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
