'use client'

import Image from 'next/image'

interface SummaryCardProps {
  title: string
  value: string
  change: string
  changeColor?: string
}

export default function CardSummary({ title, value, change, changeColor = "text-gray" }: SummaryCardProps) {
  return (
    <div className="bg-gray-100 p-4 sm:p-6 rounded-xl border border-transparent hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm sm:text-base font-medium text-gray-700">{title}</h3>
        <button className="p-1 hover:bg-gray-200 rounded transition-colors">
          <Image
            src="/images/dots-horizontal.png"
            alt="Options"
            width={20}
            height={20}
            className="w-4 h-4 sm:w-5 sm:h-5"
          />
        </button>
      </div>
      <p className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{value}</p>
      <p className={`text-xs sm:text-sm ${changeColor}`}>{change}</p>
    </div>
  )
}