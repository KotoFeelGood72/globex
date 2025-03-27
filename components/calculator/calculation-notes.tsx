'use client';

import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface CalculationNotesProps {
  notes: string;
  onNotesChange: (notes: string) => void;
}

export function CalculationNotes({
  notes,
  onNotesChange,
}: CalculationNotesProps) {
  return (
    <div className="space-y-2">
      <Label>Заметки к расчету</Label>
      <Textarea
        value={notes}
        onChange={(e) => onNotesChange(e.target.value)}
        placeholder="Добавьте заметки к расчету..."
        className="min-h-[100px]"
      />
    </div>
  );
}
