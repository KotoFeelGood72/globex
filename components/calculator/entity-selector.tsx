'use client';

import { Select, SelectItem } from '@nextui-org/react';
import { Broker, Partner, Company } from '@/types/calculator';

interface EntitySelectorProps {
  brokers: Broker[];
  selectedBrokerId?: string;
  selectedPartnerId?: string;
  selectedCompanyId?: string;
  onBrokerChange: (brokerId: string) => void;
  onPartnerChange: (partnerId: string) => void;
  onCompanyChange: (companyId: string) => void;
  mode: 'admin' | 'broker' | 'partner';
}

export function EntitySelector({
  brokers,
  selectedBrokerId,
  selectedPartnerId,
  selectedCompanyId,
  onBrokerChange,
  onPartnerChange,
  onCompanyChange,
  mode
}: EntitySelectorProps) {
  const selectedBroker = brokers.find(b => b.id === selectedBrokerId);
  const selectedPartner = selectedBroker?.partners.find(p => p.id === selectedPartnerId);

  return (
    <div className="flex flex-col gap-4">
      {mode === 'admin' && (
        <Select
          label="Брокер"
          placeholder="Выберите брокера"
          value={selectedBrokerId}
          onChange={(e) => onBrokerChange(e.target.value)}
        >
          {brokers.map((broker) => (
            <SelectItem key={broker.id} value={broker.id}>
              {broker.name}
            </SelectItem>
          ))}
        </Select>
      )}

      {(mode === 'admin' || mode === 'broker') && selectedBroker && (
        <Select
          label="Партнер"
          placeholder="Выберите партнера"
          value={selectedPartnerId}
          onChange={(e) => onPartnerChange(e.target.value)}
        >
          {selectedBroker.partners.map((partner) => (
            <SelectItem key={partner.id} value={partner.id}>
              {partner.name}
            </SelectItem>
          ))}
        </Select>
      )}

      {selectedPartner && (
        <Select
          label="Компания"
          placeholder="Выберите компанию"
          value={selectedCompanyId}
          onChange={(e) => onCompanyChange(e.target.value)}
        >
          {selectedPartner.companies.map((company) => (
            <SelectItem key={company.id} value={company.id}>
              {company.name}
            </SelectItem>
          ))}
        </Select>
      )}
    </div>
  );
}
