import SummaryCard from './CardSummary'

export default function CardMain() {
  const summaryData = [
    {
      title: "Total Balance",
      value: "$12,345",
      change: "+5%",
      changeColor: "text-green-600"
    },
    {
      title: "Total Credits", 
      value: "$7,890",
      change: "+3%",
      changeColor: "text-green-600"
    },
    {
      title: "Total Expenses",
      value: "$4,455", 
      change: "-2%",
      changeColor: "text-red-600"
    },
    {
      title: "Transactions",
      value: "150",
      change: "+10%",
      changeColor: "text-green-600"
    }
  ]

  return (
    <div className="space-y-6">
      <div className="font-bold text-primary text-lg sm:text-xl">
        Summary
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {summaryData.map((item, index) => (
          <SummaryCard
            key={index}
            title={item.title}
            value={item.value}
            change={item.change}
            changeColor={item.changeColor}
          />
        ))}
      </div>
    </div>
  )
}