'use client'

import { UnderConstruction } from '@/components/under-construction'

interface Props {
  title?: string
}

export function UnderConstructionPage({ title = 'В разработке' }: Props) {
  return <UnderConstruction />
}

export default UnderConstructionPage
