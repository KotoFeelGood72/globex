'use client'

import { Card } from '@/components/ui/card'
import { usePartners } from '@/hooks/use-partners'

export const PartnerDetailsClient = ({ id }: { id: string }) => {
  const { data: partner, isLoading } = usePartners(id)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!partner) {
    return <div>Partner not found</div>
  }

  return (
    <Card className="p-4">
      <h2 className="text-2xl font-bold mb-4">{partner.name}</h2>
      <div className="space-y-2">
        <p><span className="font-medium">Email:</span> {partner.email}</p>
        <p><span className="font-medium">Status:</span> {partner.status}</p>
        {/* Add more partner details as needed */}
      </div>
    </Card>
  )
}

export default PartnerDetailsClient
