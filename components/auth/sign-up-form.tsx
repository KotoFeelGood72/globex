'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { Button, Input } from '@nextui-org/react';
import { toast } from '@/components/ui/use-toast';
import { TelegramIcon, WhatsAppIcon } from '@/components/ui/icons';

export function SignUpForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Пароли не совпадают');
      }

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Произошла ошибка при регистрации');
      }

      toast({
        title: 'Успешно',
        description: 'Вы успешно зарегистрировались',
      });

      // Автоматический вход после регистрации
      await signIn('credentials', {
        redirect: true,
        email: formData.email,
        password: formData.password,
        callbackUrl: '/admin/dashboard',
      });
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: error instanceof Error ? error.message : 'Произошла ошибка при регистрации',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">Регистрация</h1>
        <p className="text-muted-foreground">
          Создайте свой аккаунт для доступа к системе
        </p>
      </div>

      <div className="grid gap-4">
        <Button
          variant="bordered"
          startContent={<TelegramIcon className="w-5 h-5" />}
          fullWidth
          disabled
        >
          Войти через Telegram
        </Button>
        <Button
          variant="bordered"
          startContent={<WhatsAppIcon className="w-5 h-5" />}
          fullWidth
          disabled
        >
          Войти через WhatsApp
        </Button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Или зарегистрируйтесь с помощью email
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          label="Имя"
          placeholder="Иван Иванов"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          required
        />

        <Input
          type="email"
          label="Email"
          placeholder="user@example.com"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          required
        />

        <Input
          type="password"
          label="Пароль"
          placeholder="••••••••"
          value={formData.password}
          onChange={(e) => handleChange('password', e.target.value)}
          required
        />

        <Input
          type="password"
          label="Подтверждение пароля"
          placeholder="••••••••"
          value={formData.confirmPassword}
          onChange={(e) => handleChange('confirmPassword', e.target.value)}
          required
        />

        <Button
          type="submit"
          color="primary"
          fullWidth
          isLoading={loading}
        >
          Зарегистрироваться
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Уже есть аккаунт?{' '}
        <Link
          href="/auth/signin"
          className="text-primary hover:underline"
        >
          Войти
        </Link>
      </p>
    </div>
  );
}
