"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
} from "@nextui-org/react";
import { Input, Textarea } from "@nextui-org/react";
import { useState } from "react";
import { useToast } from "./use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const formSchema = z.object({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  email: z.string().email("Введите корректный email"),
  phone: z.string().min(10, "Введите корректный номер телефона"),
  message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function ContactModal({ isOpen, onClose }: Props) {
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

      // Закрываем модалку через 3 секунды
      setTimeout(() => {
        onClose();
        setSubmitSuccess(false);
      }, 3000);
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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="3xl"
      classNames={{
        base: "bg-content1",
      }}
      className="max-w-[450px] p-8"
    >
      <ModalContent>
        <ModalHeader>
          <h2 className="text-2xl font-bold text-center w-full">
            Получить консультацию
          </h2>
        </ModalHeader>
        <ModalBody>
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
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
