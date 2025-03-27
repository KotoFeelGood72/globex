'use client';

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Button,
  Tooltip,
} from '@nextui-org/react';
import { Deal, DealStatus } from '@/types/deal';

interface DealListProps {
  deals: Deal[];
  role: 'ADMIN' | 'BROKER' | 'PARTNER' | 'COMPANY';
  onDealClick: (deal: Deal) => void;
}

const statusColorMap: Record<DealStatus, "default" | "primary" | "secondary" | "success" | "warning" | "danger"> = {
  [DealStatus.DRAFT]: 'default',
  [DealStatus.PENDING_PARTNER]: 'primary',
  [DealStatus.PENDING_BROKER]: 'secondary',
  [DealStatus.APPROVED]: 'success',
  [DealStatus.IN_PROGRESS]: 'primary',
  [DealStatus.COMPLETED]: 'success',
  [DealStatus.REJECTED]: 'danger',
  [DealStatus.CANCELLED]: 'warning',
};

const statusTextMap: Record<DealStatus, string> = {
  [DealStatus.DRAFT]: 'Черновик',
  [DealStatus.PENDING_PARTNER]: 'Ожидает партнера',
  [DealStatus.PENDING_BROKER]: 'Ожидает брокера',
  [DealStatus.APPROVED]: 'Одобрено',
  [DealStatus.IN_PROGRESS]: 'В процессе',
  [DealStatus.COMPLETED]: 'Завершено',
  [DealStatus.REJECTED]: 'Отклонено',
  [DealStatus.CANCELLED]: 'Отменено',
};

export function DealList({ deals, role, onDealClick }: DealListProps) {
  const getVisibleColumns = () => {
    const columns = [
      { key: 'id', label: '№' },
      { key: 'createdAt', label: 'Дата' },
      { key: 'amount', label: 'Сумма' },
      { key: 'status', label: 'Статус' },
    ];

    switch (role) {
      case 'ADMIN':
        return [
          ...columns,
          { key: 'broker', label: 'Брокер' },
          { key: 'partner', label: 'Партнер' },
          { key: 'company', label: 'Компания' },
          { key: 'profit', label: 'Прибыль системы' },
        ];
      case 'BROKER':
        return [
          ...columns,
          { key: 'partner', label: 'Партнер' },
          { key: 'company', label: 'Компания' },
          { key: 'profit', label: 'Прибыль брокера' },
        ];
      case 'PARTNER':
        return [
          ...columns,
          { key: 'company', label: 'Компания' },
          { key: 'profit', label: 'Прибыль партнера' },
        ];
      case 'COMPANY':
        return [
          ...columns,
          { key: 'exchangeRate', label: 'Курс' },
          { key: 'total', label: 'Итого' },
        ];
      default:
        return columns;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ru-RU');
  };

  const formatMoney = (amount: number, currency: string) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const getParticipantProfit = (deal: Deal, role: string) => {
    const participant = deal.participants.find(p => p.role === role);
    return participant ? formatMoney(participant.profit, deal.currency) : '-';
  };

  return (
    <Table aria-label="Список сделок">
      <TableHeader>
        {getVisibleColumns().map((column) => (
          <TableColumn key={column.key}>{column.label}</TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {deals.map((deal) => (
          <TableRow key={deal.id} onClick={() => onDealClick(deal)} className="cursor-pointer">
            <TableCell>{deal.id}</TableCell>
            <TableCell>{formatDate(deal.createdAt)}</TableCell>
            <TableCell>{formatMoney(deal.amount, deal.currency)}</TableCell>
            <TableCell>
              <Chip color={statusColorMap[deal.status]}>
                {statusTextMap[deal.status]}
              </Chip>
            </TableCell>
            {role === 'ADMIN' && (
              <>
                <TableCell>{deal.brokerId}</TableCell>
                <TableCell>{deal.partnerId}</TableCell>
                <TableCell>{deal.companyId}</TableCell>
                <TableCell>{getParticipantProfit(deal, 'ADMIN')}</TableCell>
              </>
            )}
            {role === 'BROKER' && (
              <>
                <TableCell>{deal.partnerId}</TableCell>
                <TableCell>{deal.companyId}</TableCell>
                <TableCell>{getParticipantProfit(deal, 'BROKER')}</TableCell>
              </>
            )}
            {role === 'PARTNER' && (
              <>
                <TableCell>{deal.companyId}</TableCell>
                <TableCell>{getParticipantProfit(deal, 'PARTNER')}</TableCell>
              </>
            )}
            {role === 'COMPANY' && (
              <>
                <TableCell>{deal.exchangeRate}</TableCell>
                <TableCell>{formatMoney(deal.amount * deal.exchangeRate, 'RUB')}</TableCell>
              </>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
