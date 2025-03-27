'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Coefficients } from '@/types/calculator';

interface CommissionSettingsProps {
  coefficients: Coefficients;
  onCoefficientsChange: (coefficients: Coefficients) => void;
  onSave: () => void;
}

export function CommissionSettings({
  coefficients,
  onCoefficientsChange,
  onSave,
}: CommissionSettingsProps) {
  const handleChange = (field: keyof Coefficients, value: string) => {
    const numValue = value === '' ? 0 : Number(value);
    onCoefficientsChange({
      ...coefficients,
      [field]: numValue,
    });
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Комиссия за конвертацию (%)</Label>
          <Input
            type="number"
            step="0.01"
            value={coefficients.conversionFee || ''}
            onChange={(e) => handleChange('conversionFee', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Комиссия субагента (%)</Label>
          <Input
            type="number"
            step="0.01"
            value={coefficients.subagentFee || ''}
            onChange={(e) => handleChange('subagentFee', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Банковская комиссия (%)</Label>
          <Input
            type="number"
            step="0.01"
            value={coefficients.bankFee || ''}
            onChange={(e) => handleChange('bankFee', e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Ставка партнера (%)</Label>
          <Input
            type="number"
            step="0.01"
            value={coefficients.partnerRate || ''}
            onChange={(e) => handleChange('partnerRate', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Ставка платформы (%)</Label>
          <Input
            type="number"
            step="0.01"
            value={coefficients.platformRate || ''}
            onChange={(e) => handleChange('platformRate', e.target.value)}
          />
        </div>

        <Button onClick={onSave} className="mt-4 w-full">
          Сохранить настройки
        </Button>
      </div>
    </div>
  );
}
