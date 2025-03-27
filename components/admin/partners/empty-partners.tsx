'use client';

import { Button } from '@nextui-org/react';
import { RiUserAddLine } from 'react-icons/ri';

interface EmptyPartnersProps {
  onAdd: () => void;
}

export function EmptyPartners({ onAdd }: EmptyPartnersProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="rounded-full bg-primary/10 p-4 mb-4">
        <RiUserAddLine className="h-8 w-8 text-primary" />
      </div>
      <h3 className="text-lg font-semibold mb-2">Нет партнеров</h3>
      <p className="text-default-500 mb-4 max-w-md">
        У вас пока нет добавленных партнеров. Начните с добавления первого партнера в систему.
      </p>
      <Button
        color="primary"
        startContent={<RiUserAddLine />}
        onPress={onAdd}
      >
        Добавить партнера
      </Button>
    </div>
  );
}
