'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button, Input } from '@nextui-org/react';
import { toast } from '@/components/ui/use-toast';
import { TelegramIcon, WhatsAppIcon } from '@/components/ui/icons';

export function SignInForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      toast({
        title: 'Успешно',
        description: 'Вы успешно вошли в систему',
      });

      router.push('/admin/dashboard');
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: error instanceof Error ? error.message : 'Произошла ошибка при входе',
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
        <h1 className="text-2xl font-bold">Вход в систему</h1>
        <p className="text-muted-foreground">
          Введите свои данные для входа
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
            Или войдите с помощью email
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
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

        <Button
          type="submit"
          color="primary"
          fullWidth
          isLoading={loading}
        >
          Войти
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Нет аккаунта?{' '}
        <Link
          href="/auth/signup"
          className="text-primary hover:underline"
        >
          Зарегистрироваться
        </Link>
      </p>
    </div>
  );
}
