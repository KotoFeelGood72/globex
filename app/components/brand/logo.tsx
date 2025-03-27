'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';

export function Logo() {
  const { theme } = useTheme();

  return (
    <Link href="/" className="flex items-center gap-2">
      <Image
        src="/images/globexpay-logo-text.svg"
        alt="GLOBEX"
        width={120}
        height={32}
        className={theme === 'light' ? 'invert' : ''}
        priority
      />
    </Link>
  );
}
