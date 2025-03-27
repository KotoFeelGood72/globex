'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  HomeIcon, 
  ChartBarIcon,
  ArrowsRightLeftIcon,
  DocumentTextIcon,
  BuildingLibraryIcon
} from '@heroicons/react/24/outline';

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ForwardRefExoticComponent<any>;
  roles: string[];
}

const navigation: NavigationItem[] = [
  { 
    name: 'Дашборд', 
    href: '/broker/dashboard', 
    icon: ChartBarIcon,
    roles: ['broker']
  },
  { 
    name: 'Курсы валют', 
    href: '/broker/rates', 
    icon: ArrowsRightLeftIcon,
    roles: ['broker']
  },
  { 
    name: 'Поручения', 
    href: '/broker/transactions', 
    icon: DocumentTextIcon,
    roles: ['broker']
  },
  { 
    name: 'Статистика', 
    href: '/broker/stats', 
    icon: ChartBarIcon,
    roles: ['broker']
  },
];

export function ProtectedNavigation({ userRole = 'broker' }: { userRole?: string }) {
  const pathname = usePathname();
  const filteredNavigation = navigation.filter(item => item.roles.includes(userRole));

  return (
    <nav className="flex flex-col gap-2">
      {filteredNavigation.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              isActive 
                ? 'bg-primary text-white' 
                : 'text-default-600 hover:bg-default-100'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
