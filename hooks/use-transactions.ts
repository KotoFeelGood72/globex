import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useTransactions(id?: string) {
  const { data, error, isLoading } = useSWR(
    id ? `/api/transactions/${id}` : '/api/transactions',
    fetcher
  )

  return {
    data,
    isLoading,
    isError: error
  }
}
