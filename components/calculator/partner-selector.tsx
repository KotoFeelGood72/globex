'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface Partner {
  id: string;
  name: string;
  companies: Array<{
    id: string;
    name: string;
  }>;
}

interface PartnerSelectorProps {
  partners: Partner[];
  selectedPartnerId: string;
  selectedCompanyId: string;
  onPartnerChange: (partnerId: string) => void;
  onCompanyChange: (companyId: string) => void;
}

export function PartnerSelector({
  partners,
  selectedPartnerId,
  selectedCompanyId,
  onPartnerChange,
  onCompanyChange,
}: PartnerSelectorProps) {
  const selectedPartner = partners.find(p => p.id === selectedPartnerId);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Партнер</Label>
        <Select value={selectedPartnerId} onValueChange={onPartnerChange}>
          <SelectTrigger>
            <SelectValue placeholder="Выберите партнера" />
          </SelectTrigger>
          <SelectContent>
            {partners.map(partner => (
              <SelectItem key={partner.id} value={partner.id}>
                {partner.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedPartner && (
        <div className="space-y-2">
          <Label>Компания</Label>
          <Select value={selectedCompanyId} onValueChange={onCompanyChange}>
            <SelectTrigger>
              <SelectValue placeholder="Выберите компанию" />
            </SelectTrigger>
            <SelectContent>
              {selectedPartner.companies.map(company => (
                <SelectItem key={company.id} value={company.id}>
                  {company.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}
