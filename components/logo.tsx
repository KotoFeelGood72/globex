'use client';

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Building2 } from "lucide-react";

interface LogoProps {
  className?: string;
  showText?: boolean;
  href?: string;
}

export function Logo({ className, showText = true, href }: LogoProps) {
  const content = (
    <>
      <Building2 className="h-6 w-6" />
      {showText && (
        <span className="font-bold text-xl">
          GLOBEX
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cn("flex items-center space-x-2", className)}>
        {content}
      </Link>
    );
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      {content}
    </div>
  );
}
