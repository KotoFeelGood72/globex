'use client'

import { Card } from '@/components/ui/card'
import { useTransactions } from '@/hooks/use-transactions'

export const TransactionStats = () => {
  const { data, isLoading } = useTransactions()

  if (isLoading) {
    return <div>Loading stats...</div>
  }

  // Здесь должна быть логика подсчета статистики
  const stats = {
    total: data?.length || 0,
    completed: data?.filter((t: any) => t.status === 'completed').length || 0,
    pending: data?.filter((t: any) => t.status === 'pending').length || 0,
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="p-4">
        <h3 className="text-sm font-medium">Total Transactions</h3>
        <p className="text-2xl font-bold">{stats.total}</p>
      </Card>
      <Card className="p-4">
        <h3 className="text-sm font-medium">Completed</h3>
        <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
      </Card>
      <Card className="p-4">
        <h3 className="text-sm font-medium">Pending</h3>
        <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
      </Card>
    </div>
  )
}

export default TransactionStats
