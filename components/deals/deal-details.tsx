'use client';

import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Chip,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react';
import { Deal, DealStatus } from '@/types/deal';

interface DealDetailsProps {
  deal: Deal;
  role: 'ADMIN' | 'BROKER' | 'PARTNER' | 'COMPANY';
  onStatusChange?: (dealId: string, newStatus: DealStatus, comment?: string) => void;
}

const canChangeStatus = (currentStatus: DealStatus, role: string): DealStatus[] => {
  switch (role) {
    case 'ADMIN':
      return [DealStatus.APPROVED, DealStatus.REJECTED];
    case 'BROKER':
      if (currentStatus === DealStatus.PENDING_BROKER) {
        return [DealStatus.APPROVED, DealStatus.REJECTED];
      }
      return [];
    case 'PARTNER':
      if (currentStatus === DealStatus.PENDING_PARTNER) {
        return [DealStatus.PENDING_BROKER, DealStatus.REJECTED];
      }
      return [];
    case 'COMPANY':
      if (currentStatus === DealStatus.DRAFT) {
        return [DealStatus.PENDING_PARTNER];
      }
      return [DealStatus.CANCELLED];
    default:
      return [];
  }
};

export function DealDetails({ deal, role, onStatusChange }: DealDetailsProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const availableStatuses = canChangeStatus(deal.status, role);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ru-RU');
  };

  const formatMoney = (amount: number, currency: string) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Сделка #{deal.id}</h3>
        <Chip>{deal.status}</Chip>
      </CardHeader>
      <Divider />
      <CardBody className="space-y-4">
        {/* Основная информация */}
        <div>
          <h4 className="font-medium mb-2">Основная информация</h4>
          <div className="grid grid-cols-2 gap-2">
            <span className="text-default-500">Создано:</span>
            <span>{formatDate(deal.createdAt)}</span>
            <span className="text-default-500">Сумма:</span>
            <span>{formatMoney(deal.amount, deal.currency)}</span>
            <span className="text-default-500">Курс:</span>
            <span>{deal.exchangeRate} ({deal.exchangeSource})</span>
          </div>
        </div>

        <Divider />

        {/* Комиссии и прибыль */}
        <div>
          <h4 className="font-medium mb-2">Комиссии и прибыль</h4>
          <div className="grid grid-cols-2 gap-2">
            {role === 'ADMIN' && (
              <>
                <span className="text-default-500">Комиссия системы:</span>
                <span>{deal.commissions.systemRate}%</span>
                <span className="text-default-500">Комиссия брокера:</span>
                <span>{deal.commissions.brokerRate}%</span>
              </>
            )}
            {(role === 'ADMIN' || role === 'BROKER') && (
              <>
                <span className="text-default-500">Комиссия партнера:</span>
                <span>{deal.commissions.partnerRate}%</span>
              </>
            )}
            <span className="text-default-500">Прибыль:</span>
            <span>{formatMoney(
              deal.participants.find(p => p.role === role)?.profit || 0,
              deal.currency
            )}</span>
          </div>
        </div>

        <Divider />

        {/* История статусов */}
        <div>
          <h4 className="font-medium mb-2">История статусов</h4>
          <div className="space-y-2">
            {deal.statusHistory.map((history, index) => (
              <div key={index} className="flex justify-between items-center">
                <Chip size="sm">{history.status}</Chip>
                <span className="text-small text-default-500">
                  {formatDate(history.timestamp)}
                </span>
                {history.comment && (
                  <span className="text-small">{history.comment}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Комментарии */}
        <Divider />
        <div>
          <h4 className="font-medium mb-2">Комментарии</h4>
          <div className="space-y-2">
            {deal.comments.map((comment, index) => (
              <div key={index} className="p-2 bg-default-100 rounded-lg">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium">{comment.role}</span>
                  <span className="text-small text-default-500">
                    {formatDate(comment.timestamp)}
                  </span>
                </div>
                <p className="text-small">{comment.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Действия */}
        {availableStatuses.length > 0 && (
          <>
            <Divider />
            <div className="flex gap-2">
              {availableStatuses.map((status) => (
                <Button
                  key={status}
                  color={status === DealStatus.REJECTED ? 'danger' : 'primary'}
                  onPress={onOpen}
                >
                  {status === DealStatus.APPROVED && 'Одобрить'}
                  {status === DealStatus.REJECTED && 'Отклонить'}
                  {status === DealStatus.PENDING_PARTNER && 'Отправить партнеру'}
                  {status === DealStatus.PENDING_BROKER && 'Отправить брокеру'}
                  {status === DealStatus.CANCELLED && 'Отменить'}
                </Button>
              ))}
            </div>
          </>
        )}
      </CardBody>

      {/* Модальное окно для изменения статуса */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Изменить статус сделки</ModalHeader>
              <ModalBody>
                {/* Здесь можно добавить форму для комментария */}
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Отмена
                </Button>
                <Button color="primary" onPress={onClose}>
                  Подтвердить
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </Card>
  );
}
