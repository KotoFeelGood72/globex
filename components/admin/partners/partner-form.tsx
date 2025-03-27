'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
} from '@nextui-org/react';

const partnerSchema = z.object({
  name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  email: z.string().email('Неверный формат email'),
  phone: z.string().min(10, 'Телефон должен содержать минимум 10 цифр'),
  company: z.string().min(2, 'Название компании должно содержать минимум 2 символа'),
  status: z.enum(['active', 'pending', 'blocked']),
  commissionRate: z.number().min(0).max(100),
});

type PartnerFormData = z.infer<typeof partnerSchema>;

interface PartnerFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: PartnerFormData) => Promise<void>;
  initialData?: Partial<PartnerFormData>;
}

const statusOptions = [
  { value: 'active', label: 'Активный' },
  { value: 'pending', label: 'На рассмотрении' },
  { value: 'blocked', label: 'Заблокирован' },
];

export function PartnerForm({ isOpen, onClose, onSubmit, initialData }: PartnerFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PartnerFormData>({
    resolver: zodResolver(partnerSchema),
    defaultValues: initialData || {
      status: 'pending',
      commissionRate: 0.5,
    },
  });

  const onSubmitForm = async (data: PartnerFormData) => {
    try {
      await onSubmit(data);
      reset();
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <ModalHeader>
            {initialData ? 'Редактировать партнера' : 'Добавить партнера'}
          </ModalHeader>
          <ModalBody>
            <div className="grid gap-4">
              <Input
                label="Имя"
                {...register('name')}
                errorMessage={errors.name?.message}
              />
              <Input
                label="Email"
                type="email"
                {...register('email')}
                errorMessage={errors.email?.message}
              />
              <Input
                label="Телефон"
                type="tel"
                {...register('phone')}
                errorMessage={errors.phone?.message}
              />
              <Input
                label="Компания"
                {...register('company')}
                errorMessage={errors.company?.message}
              />
              <Select
                label="Статус"
                {...register('status')}
                errorMessage={errors.status?.message}
                defaultSelectedKeys={[initialData?.status || 'pending']}
              >
                {statusOptions.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </Select>
              <Input
                label="Комиссия (%)"
                type="number"
                step="0.1"
                min="0"
                max="100"
                defaultValue={initialData?.commissionRate || "0.5"}
                {...register('commissionRate', { valueAsNumber: true })}
                errorMessage={errors.commissionRate?.message}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Отмена
            </Button>
            <Button color="primary" type="submit" isLoading={isSubmitting}>
              {initialData ? 'Сохранить' : 'Добавить'}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
