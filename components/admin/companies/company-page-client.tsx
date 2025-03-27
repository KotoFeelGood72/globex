'use client'

import { Card } from '@/components/ui/card'
import { useCompanies } from '@/hooks/use-companies'

export default function CompanyPageClient({ id }: { id: string }) {
  const { data: company, isLoading } = useCompanies(id)

  if (isLoading) {
    return <div>Loading company details...</div>
  }

  if (!company) {
    return <div>Company not found</div>
  }

  return (
    <Card className="p-4">
      <h2 className="text-2xl font-bold mb-4">{company.name}</h2>
      <div className="space-y-2">
        <p><span className="font-medium">Email:</span> {company.email}</p>
        <p><span className="font-medium">Status:</span> {company.status}</p>
        <p><span className="font-medium">Registration Date:</span> {new Date(company.createdAt).toLocaleDateString()}</p>
        {/* Add more company details as needed */}
      </div>
    </Card>
  )
}
