'use client';

import { Link as ScrollLink } from 'react-scroll';

const menuItems = [
  { id: 'about', label: 'О нас' },
  { id: 'calculator', label: 'Калькулятор' },
  { id: 'benefits', label: 'Преимущества' },
  { id: 'how-we-work', label: 'Как мы работаем' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Контакты' },
];

export function Menu() {
  return (
    <nav className="hidden md:flex items-center space-x-6">
      {menuItems.map((item) => (
        <ScrollLink
          key={item.id}
          to={item.id}
          spy={true}
          smooth={true}
          offset={-80}
          duration={500}
          className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-50 cursor-pointer transition-colors"
          activeClass="text-primary"
        >
          {item.label}
        </ScrollLink>
      ))}
    </nav>
  );
}
