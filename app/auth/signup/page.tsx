'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Card, CardBody, CardHeader, Divider } from '@nextui-org/react';
import { signIn } from 'next-auth/react';
import { useToast } from '@/components/ui/use-toast';

export default function SignUpPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: 'Ошибка',
        description: 'Пароли не совпадают',
        variant: 'destructive',
      });
      return;
    }

    if (password.length < 8) {
      toast({
        title: 'Ошибка',
        description: 'Пароль должен содержать не менее 8 символов',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      // Регистрация
      const registerResponse = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!registerResponse.ok) {
        const error = await registerResponse.json();
        throw new Error(error.message || 'Ошибка при регистрации');
      }

      // Показываем уведомление об успешной регистрации
      toast({
        title: 'Успешно',
        description: 'Регистрация выполнена успешно',
      });

      // Автоматическая авторизация
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        throw new Error('Ошибка при автоматической авторизации');
      }

      // Перенаправляем на главную страницу
      router.push('/');
      
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: 'Ошибка',
        description: error instanceof Error ? error.message : 'Произошла ошибка при регистрации',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full shadow-xl">
      <CardHeader className="flex flex-col gap-1 px-6 pt-6">
        <h1 className="text-2xl font-semibold tracking-tight">
          Создать аккаунт
        </h1>
        <p className="text-sm text-muted-foreground">
          Введите данные для регистрации
        </p>
      </CardHeader>

      <CardBody className="px-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <Input
              type="email"
              label="Email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="bordered"
              isRequired
              isDisabled={isLoading}
              classNames={{
                label: "text-sm font-medium text-foreground",
              }}
            />

            <Input
              type="password"
              label="Пароль"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="bordered"
              isRequired
              isDisabled={isLoading}
              classNames={{
                label: "text-sm font-medium text-foreground",
              }}
            />

            <Input
              type="password"
              label="Подтвердите пароль"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              variant="bordered"
              isRequired
              isDisabled={isLoading}
              classNames={{
                label: "text-sm font-medium text-foreground",
              }}
            />
          </div>

          <Button
            type="submit"
            color="primary"
            className="w-full"
            isLoading={isLoading}
          >
            {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
          </Button>

          <div className="relative my-4">
            <Divider className="my-4" />
            <p className="text-center text-sm text-muted-foreground">
              Уже есть аккаунт?{' '}
              <Button
                as="a"
                href="/auth/signin"
                variant="light"
                className="text-primary"
                isDisabled={isLoading}
              >
                Войти
              </Button>
            </p>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
