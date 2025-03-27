'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export const UnderConstruction = () => {
  const router = useRouter()

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <Card className="w-full max-w-md p-6 text-center space-y-4">
        <div className="text-6xl mb-4">🚧</div>
        <h1 className="text-2xl font-bold">В разработке</h1>
        <p className="text-gray-500">
          Этот раздел находится в разработке. Скоро здесь появится новый функционал!
        </p>
        <Button
          onClick={() => router.push('/')}
          className="mt-4"
        >
          Вернуться на главную
        </Button>
      </Card>
    </div>
  )
}

export default UnderConstruction
