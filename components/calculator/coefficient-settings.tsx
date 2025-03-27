import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Coefficient {
  id: string;
  name: string;
  value: number;
  description: string;
}

interface CoefficientSettingsProps {
  coefficients: Coefficient[];
  onSave: (coefficients: Coefficient[]) => void;
}

export function CoefficientSettings({ coefficients, onSave }: CoefficientSettingsProps) {
  const [editedCoefficients, setEditedCoefficients] = useState<Coefficient[]>(coefficients);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleValueChange = (id: string, value: string) => {
    setEditedCoefficients(prev => 
      prev.map(coef => 
        coef.id === id ? { ...coef, value: parseFloat(value) || coef.value } : coef
      )
    );
  };

  const handleEdit = (id: string) => {
    setEditingId(id);
  };

  const handleSave = (id: string) => {
    setEditingId(null);
    onSave(editedCoefficients);
  };

  return (
    <Card className="w-full mx-2">
      <CardHeader>
        <CardTitle>Настройки коэффициентов</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Название</TableHead>
              <TableHead>Значение</TableHead>
              <TableHead>Описание</TableHead>
              <TableHead>Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {editedCoefficients.map((coef) => (
              <TableRow key={coef.id}>
                <TableCell>{coef.name}</TableCell>
                <TableCell>
                  {editingId === coef.id ? (
                    <Input
                      type="number"
                      step="0.01"
                      value={coef.value}
                      onChange={(e) => handleValueChange(coef.id, e.target.value)}
                    />
                  ) : (
                    coef.value.toFixed(4)
                  )}
                </TableCell>
                <TableCell>{coef.description}</TableCell>
                <TableCell>
                  {editingId === coef.id ? (
                    <Button variant="outline" size="sm" onClick={() => handleSave(coef.id)}>
                      Сохранить
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" onClick={() => handleEdit(coef.id)}>
                      Изменить
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
