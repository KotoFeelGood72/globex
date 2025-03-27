'use client';

import { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react';
import { toast } from '@/components/ui/use-toast';

interface DeleteUserDialogProps {
  user: { id: string; name: string } | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function DeleteUserDialog({ user, isOpen, onClose, onSuccess }: DeleteUserDialogProps) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!user) return;

    setLoading(true);

    try {
      const response = await fetch(`/api/admin/users/${user.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Ошибка при удалении пользователя');
      }

      toast({
        title: 'Успешно',
        description: 'Пользователь удален',
      });

      onSuccess?.();
      onClose();
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: error instanceof Error ? error.message : 'Произошла ошибка',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>
          <h3 className="text-lg font-semibold">Удалить пользователя</h3>
        </ModalHeader>
        <ModalBody>
          <p>
            Вы уверены, что хотите удалить пользователя{' '}
            <span className="font-medium">{user?.name}</span>?
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Это действие нельзя будет отменить.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="default"
            variant="light"
            onPress={onClose}
            disabled={loading}
          >
            Отмена
          </Button>
          <Button
            color="danger"
            onPress={handleDelete}
            isLoading={loading}
          >
            Удалить
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
