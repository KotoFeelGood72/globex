"use client";

import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalculationRequest, RequestStatus } from '@/types/calculator';

type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline' | 'success';
type Variants = Record<RequestStatus, BadgeVariant>;
type Labels = Record<RequestStatus, string>;

const variants: Variants = {
  pending: 'secondary',
  accepted: 'success',
  rejected: 'destructive',
  completed: 'default',
  draft: 'outline'
};

const labels: Labels = {
  pending: 'На рассмотрении',
  accepted: 'Принято',
  rejected: 'Отклонено',
  completed: 'Завершено',
  draft: 'Черновик'
};

export const columns: ColumnDef<CalculationRequest>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'createdAt',
    header: 'Дата создания',
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt'));
      return date.toLocaleDateString('ru-RU');
    },
  },
  {
    accessorKey: 'status',
    header: 'Статус',
    cell: ({ row }) => {
      const status = row.getValue('status') as RequestStatus;

      return (
        <Badge variant={variants[status]}>
          {labels[status]}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'amount',
    header: 'Сумма',
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'));
      const formatted = new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'USD',
      }).format(amount);

      return formatted;
    },
  },
  {
    accessorKey: 'company.name',
    header: 'Компания',
  },
  {
    accessorKey: 'broker.name',
    header: 'Брокер',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const status = row.getValue('status') as RequestStatus;
      
      if (status === 'pending') {
        return (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                // TODO: Implement accept action
              }}
            >
              Принять
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                // TODO: Implement reject action
              }}
            >
              Отклонить
            </Button>
          </div>
        );
      }
      
      return null;
    },
  },
];
