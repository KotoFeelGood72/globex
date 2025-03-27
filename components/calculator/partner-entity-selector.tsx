'use client';

import {
  Card,
  CardBody,
  Select,
  SelectItem,
} from '@nextui-org/react';

interface Company {
  id: string;
  name: string;
  partnerId: string;
}

interface Partner {
  id: string;
  name: string;
  companies: Company[];
}

interface EntitySelectorProps {
  partners: Partner[];
  selectedPartnerId?: string;
  selectedCompanyId?: string;
  onPartnerChange: (partnerId: string) => void;
  onCompanyChange: (companyId: string) => void;
}

export function PartnerEntitySelector({
  partners,
  selectedPartnerId,
  selectedCompanyId,
  onPartnerChange,
  onCompanyChange,
}: EntitySelectorProps) {
  const selectedPartner = partners.find(p => p.id === selectedPartnerId);
  const companies = selectedPartner?.companies || [];

  return (
    <Card>
      <CardBody className="gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Компания"
            placeholder="Выберите компанию"
            selectedKeys={selectedCompanyId ? [selectedCompanyId] : []}
            onChange={(e) => onCompanyChange(e.target.value)}
          >
            {companies.map((company) => (
              <SelectItem key={company.id} value={company.id}>
                {company.name}
              </SelectItem>
            ))}
          </Select>
        </div>
      </CardBody>
    </Card>
  );
}
