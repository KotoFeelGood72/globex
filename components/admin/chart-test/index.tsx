'use client'

import { Card } from '@/components/ui/card'
import { BarChart } from '@tremor/react'

const chartdata = [
  {
    name: 'Jan',
    'Number of transactions': 2488,
  },
  {
    name: 'Feb',
    'Number of transactions': 1445,
  },
  // Добавьте больше данных по необходимости
]

const dataFormatter = (number: number) => {
  return Intl.NumberFormat('us').format(number).toString()
}

export const ChartTest = () => {
  return (
    <Card className="p-4">
      <h3 className="text-lg font-medium">Transactions Overview</h3>
      <BarChart
        data={chartdata}
        index="name"
        categories={['Number of transactions']}
        colors={['blue']}
        valueFormatter={dataFormatter}
        yAxisWidth={48}
        className="mt-4 h-72"
      />
    </Card>
  )
}

export default ChartTest
