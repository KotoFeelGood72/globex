'use client'

import { Card } from '@/components/ui/card'
import { useExchangeRates } from '@/hooks/use-exchange-rates'

export const ExchangeRates = () => {
  const { data: rates, isLoading } = useExchangeRates()

  if (isLoading) {
    return <div>Loading rates...</div>
  }

  return (
    <Card className="p-4">
      <h3 className="text-lg font-medium mb-4">Exchange Rates</h3>
      <div className="space-y-2">
        {rates?.map((rate) => (
          <div key={rate.id} className="flex justify-between">
            <span>{rate.currencyPair}</span>
            <span className="font-medium">{rate.rate.toFixed(4)}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default ExchangeRates
