"use client";

import Image from "next/image";
import { useTheme } from "next-themes";

export function Logo() {
  const { theme } = useTheme();

  return (
    <Image
      src="/images/globexpay-logo-text.svg"
      alt="GLOBEX"
      width={160}
      height={43}
      className={`h-auto ${theme === 'light' ? 'invert' : ''}`}
      priority
    />
  );
}
