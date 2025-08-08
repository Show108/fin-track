import Table from './Table'

interface TransactionsTabProps {
  searchQuery?: string
}

export default function TransactionsTab({ searchQuery = '' }: TransactionsTabProps) {
  return (
    <div className="space-y-6">
      <div className="font-bold text-primary text-lg sm:text-xl">
        All Transactions
      </div>
      <Table searchQuery={searchQuery} />
    </div>
  )
}