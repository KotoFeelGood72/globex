'use client'

import { Card } from '@/components/ui/card'
import { useCompanyTransactions } from '@/hooks/use-company-transactions'

export default function CompanyTransactionsClient({ id }: { id: string }) {
  const { data: transactions, isLoading } = useCompanyTransactions(id)

  if (isLoading) {
    return <div>Loading transactions...</div>
  }

  return (
    <Card className="p-4">
      <h2 className="text-2xl font-bold mb-4">Company Transactions</h2>
      <div className="space-y-4">
        {transactions?.map((transaction: any) => (
          <Card key={transaction.id} className="p-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{transaction.type}</p>
                <p className="text-sm text-gray-500">
                  {new Date(transaction.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold">{transaction.amount} {transaction.currency}</p>
                <p className={`text-sm ${
                  transaction.status === 'completed' ? 'text-green-500' :
                  transaction.status === 'pending' ? 'text-yellow-500' :
                  'text-red-500'
                }`}>
                  {transaction.status}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  )
}
