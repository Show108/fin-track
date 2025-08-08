import Table from './Table'
import CardMain from './CardMain'

interface OverviewTabProps {
  searchQuery?: string
}

export default function OverviewTab({ searchQuery = '' }: OverviewTabProps) {
  return (
    <div className="space-y-6">
      <CardMain />
      <Table searchQuery={searchQuery} />
    </div>
  )
}