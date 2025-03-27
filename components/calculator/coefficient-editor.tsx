'use client'

import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export const CoefficientEditor = () => {
  return (
    <Card className="p-4">
      <h3 className="text-lg font-medium mb-4">Coefficient Editor</h3>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="base-rate">Base Rate</Label>
          <Input id="base-rate" type="number" defaultValue="1.0" step="0.01" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="markup">Markup (%)</Label>
          <Input id="markup" type="number" defaultValue="2.5" step="0.1" />
        </div>
      </div>
    </Card>
  )
}

export default CoefficientEditor
