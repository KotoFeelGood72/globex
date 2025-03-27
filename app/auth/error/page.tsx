"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from 'react';
import { Button } from "@/components/ui/button";
import Link from "next/link";

function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  let errorMessage = "Произошла ошибка при входе в систему";
  let errorDescription = "Пожалуйста, попробуйте снова или обратитесь в службу поддержки";

  switch (error) {
    case "CredentialsSignin":
      errorMessage = "Неверный email или пароль";
      errorDescription = "Пожалуйста, проверьте правильность введенных данных";
      break;
    case "AccessDenied":
      errorMessage = "У вас нет доступа к этому ресурсу";
      errorDescription = "Обратитесь к администратору для получения необходимых прав";
      break;
    case "EmailSignin":
      errorMessage = "Ошибка при входе через email";
      errorDescription = "Проверьте правильность email адреса или попробуйте другой способ входа";
      break;
    case "SessionRequired":
      errorMessage = "Необходима авторизация";
      errorDescription = "Для доступа к этой странице необходимо войти в систему";
      break;
    case "Configuration":
      errorMessage = "Ошибка конфигурации";
      errorDescription = "Проверьте настройки аутентификации или обратитесь к администратору";
      break;
    case "Verification":
      errorMessage = "Ошибка верификации";
      errorDescription = "Не удалось подтвердить вашу учетную запись. Попробуйте снова";
      break;
    default:
      if (error) {
        errorMessage = `Ошибка: ${error}`;
      }
      break;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            {errorMessage}
          </h1>
          <p className="text-sm text-muted-foreground">
            {errorDescription}
          </p>
        </div>
        <div className="flex flex-col space-y-4">
          <Button asChild variant="default">
            <Link href="/auth/signin">Вернуться на страницу входа</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">На главную</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function AuthError() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    }>
      <ErrorContent />
    </Suspense>
  );
}
