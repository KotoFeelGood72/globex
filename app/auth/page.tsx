"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

export default function AuthErrorPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link href="/" className="mb-8 flex items-center space-x-2">
        <Logo className="h-8 w-8" />
        <span className="font-bold">GlobexPay</span>
      </Link>
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">Ошибка авторизации</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Произошла ошибка при попытке входа в систему
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Button asChild>
            <Link href="/auth/signin">Попробовать снова</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">На главную</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
