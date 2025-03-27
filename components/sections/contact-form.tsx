"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@nextui-org/react";
import { Input, Textarea } from "@nextui-org/react";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  email: z.string().email("Введите корректный email"),
  phone: z.string().min(10, "Введите корректный номер телефона"),
  message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      // Форматируем номер телефона
      const formattedPhone = data.phone.replace(/\D/g, "");
      const formData = {
        ...data,
        phone: formattedPhone,
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(
          responseData.error || "Произошла ошибка при отправке формы"
        );
      }

      setSubmitSuccess(true);
      reset();
      toast({
        title: "Успех",
        description: responseData.message || "Заявка успешно отправлена",
      });
    } catch (error) {
      console.error("Error submitting form:", error);

      let errorMessage = "Произошла ошибка при отправке формы";
      if (error instanceof Error) {
        errorMessage = error.message;
      }

      setErrorMessage(errorMessage);
      setSubmitSuccess(false);
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center py-24 md:-mt-48 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Левая колонка с текстом и кнопками */}
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-6 text-foreground">
              Проконсультируйтесь с экспертом по платежам
            </h2>
            <p className="text-lg text-foreground/60 mb-8">
              Расскажем, как оптимизировать платежные процессы вашего бизнеса,
              снизить комиссии и ускорить проведение транзакций. Подберем
              оптимальные решения под ваши задачи.
            </p>
            <div className="flex gap-4">
              <Button
                as="a"
                href="https://t.me/globexpayworld"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-primary text-primary-foreground hover:opacity-90"
                startContent={
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42l10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701l-.321 4.843c.47 0 .677-.216.94-.477l2.26-2.196l4.696 3.466c.866.48 1.488.233 1.704-.803l3.098-14.59c.317-1.269-.473-1.843-1.555-1.21z" />
                  </svg>
                }
              >
                Telegram
              </Button>
              <Button
                as="a"
                href="https://wa.me/996700601204"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-primary text-primary-foreground hover:opacity-90"
                startContent={
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884z" />
                  </svg>
                }
              >
                WhatsApp
              </Button>
            </div>
          </div>

          {/* Правая колонка с формой */}
          <div className="bg-card p-8 rounded-xl shadow-lg">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {submitSuccess ? (
                <div className="bg-success/10 text-success p-4 rounded-lg mb-6">
                  Спасибо! Ваша заявка успешно отправлена. Мы свяжемся с вами в
                  ближайшее время.
                </div>
              ) : errorMessage ? (
                <div className="bg-danger/10 text-danger p-4 rounded-lg mb-6">
                  {errorMessage}
                </div>
              ) : null}

              <Input
                {...register("name")}
                label="Ваше имя"
                variant="bordered"
                color={errors.name ? "danger" : "primary"}
                errorMessage={errors.name?.message}
                isDisabled={isSubmitting}
              />

              <Input
                {...register("email")}
                label="Email"
                type="email"
                variant="bordered"
                color={errors.email ? "danger" : "primary"}
                errorMessage={errors.email?.message}
                isDisabled={isSubmitting}
              />

              <Input
                {...register("phone")}
                label="Телефон"
                type="tel"
                variant="bordered"
                color={errors.phone ? "danger" : "primary"}
                errorMessage={errors.phone?.message}
                isDisabled={isSubmitting}
              />

              <Textarea
                {...register("message")}
                label="Сообщение (необязательно)"
                variant="bordered"
                color={errors.message ? "danger" : "primary"}
                errorMessage={errors.message?.message}
                isDisabled={isSubmitting}
              />

              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground"
                isLoading={isSubmitting}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Отправка..." : "Отправить заявку"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
