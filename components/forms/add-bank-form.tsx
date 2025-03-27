'use client';

import { 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem
} from "@nextui-org/react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const currencies = ['KGS', 'USD', 'EUR', 'RUB', 'CNY', 'USDT'];
const bankTypes = [
  { value: 'local', label: 'Локальный' },
  { value: 'foreign', label: 'Иностранный' },
  { value: 'crypto', label: 'Криптокошелек' }
];

export function AddBankForm({ isOpen, onClose }: Props) {
  const handleSubmit = () => {
    // TODO: Добавить логику сохранения
    onClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      size="3xl"
      classNames={{
        base: "bg-content1",
      }}
    >
      <ModalContent>
        <ModalHeader>
          <h2 className="text-xl font-bold">Добавить новый банк</h2>
        </ModalHeader>
        <ModalBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Название банка"
              placeholder="Введите название банка"
              variant="bordered"
            />
            <Input
              label="Короткое название"
              placeholder="Например: КБ"
              variant="bordered"
            />
            <Select
              label="Тип банка"
              placeholder="Выберите тип банка"
              variant="bordered"
            >
              {bankTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </Select>
            <Select
              label="Валюта"
              placeholder="Выберите валюту"
              variant="bordered"
            >
              {currencies.map((currency) => (
                <SelectItem key={currency} value={currency}>
                  {currency}
                </SelectItem>
              ))}
            </Select>
            <Input
              type="number"
              label="Баланс"
              placeholder="0.00"
              variant="bordered"
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">₽</span>
                </div>
              }
            />
            <Input
              type="number"
              label="Лимит"
              placeholder="0.00"
              variant="bordered"
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">₽</span>
                </div>
              }
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Отмена
          </Button>
          <Button color="primary" onPress={handleSubmit}>
            Добавить
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
