'use client'

import Image from 'next/image'
import { useState, useMemo } from 'react'

type SortDirection = 'asc' | 'desc' | null
type SortField = 'date' | 'remark' | 'amount' | 'currency' | 'type'

interface Transaction {
  date: string
  remark: string
  amount: string
  currency: string
  type: 'Credit' | 'Debit'
  statusDot: string
}

const mockData: Transaction[] = [
  { date: '2023-10-01', remark: 'Salary', amount: '$3,000', currency: 'USD', type: 'Credit', statusDot: '/images/Status Dot.png' },
  { date: '2023-10-02', remark: 'Groceries', amount: '-$150', currency: 'USD', type: 'Debit', statusDot: '/images/Status Dot (2).png' },
  { date: '2023-10-03', remark: 'Gym Membership', amount: '-$50', currency: 'USD', type: 'Debit', statusDot: '/images/Status Dot (2).png' },
  { date: '2023-10-04', remark: 'Dinner', amount: '-$40', currency: 'USD', type: 'Debit', statusDot: '/images/Status Dot (2).png' },
  { date: '2023-10-05', remark: 'Movie tickets', amount: '-$30', currency: 'USD', type: 'Debit', statusDot: '/images/Status Dot (2).png' },
  { date: '2023-10-06', remark: 'Rent', amount: '-$1200', currency: 'USD', type: 'Debit', statusDot: '/images/Status Dot (2).png' },
  { date: '2023-10-07', remark: 'Utilities', amount: '-$100', currency: 'USD', type: 'Debit', statusDot: '/images/Status Dot (2).png' },
  { date: '2023-10-08', remark: 'Car Payment', amount: '-$400', currency: 'USD', type: 'Debit', statusDot: '/images/Status Dot (2).png' },
  { date: '2023-10-09', remark: 'Insurance', amount: '-$200', currency: 'USD', type: 'Debit', statusDot: '/images/Status Dot (2).png' },
]

interface TableProps {
  searchQuery?: string
}
type SortableValue = string | number | Date

export default function Table({ searchQuery = '' }: TableProps) {
  const [sortField, setSortField] = useState<SortField | null>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>(null)

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortDirection === 'asc') {
        setSortDirection('desc')
      } else if (sortDirection === 'desc') {
        setSortDirection(null)
        setSortField(null)
      }
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const sortedData = useMemo(() => {
    if (!sortField || !sortDirection) return mockData

    return [...mockData].sort((a, b) => {
       let aValue: SortableValue = a[sortField]
      let bValue: SortableValue = b[sortField]
      switch (sortField) {
        case 'date':
          aValue = new Date(aValue)
          bValue = new Date(bValue)
          break
        case 'amount':
          aValue = parseFloat(aValue.replace(/[$,]/g, ''))
          bValue = parseFloat(bValue.replace(/[$,]/g, ''))
          break
        case 'remark':
        case 'currency':
        case 'type':
          aValue = aValue.toLowerCase()
          bValue = bValue.toLowerCase()
          break
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
      return 0
    })
  }, [sortField, sortDirection])

  // Filter data based on search query
  const filteredTransactions = useMemo(() => {
    if (!searchQuery.trim()) return sortedData

    const query = searchQuery.toLowerCase()
    return sortedData.filter((transaction) => 
      transaction.remark.toLowerCase().includes(query) ||
      transaction.date.toLowerCase().includes(query) ||
      transaction.currency.toLowerCase().includes(query) ||
      transaction.type.toLowerCase().includes(query) ||
      transaction.amount.toString().toLowerCase().includes(query)
    )
  }, [sortedData, searchQuery])

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return (
        <Image
          src="/images/caret-down-colour-fade.png"
          alt="Sort"
          width={12}
          height={12}
          className="w-3 h-3 opacity-50"
        />
      )
    }

    if (sortDirection === 'asc') {
      return (
        <Image
          src="/images/caret-down-colour-fade.png"
          alt="Sort ascending"
          width={12}
          height={12}
          className="w-3 h-3 rotate-180"
        />
      )
    }

    return (
      <Image
        src="/images/caret-down-colour-fade.png"
        alt="Sort descending"
        width={12}
        height={12}
        className="w-3 h-3"
      />
    )
  }

  return (
    <div className="bg-gray-30 overflow-hidden">
      {/* Search Results Info */}
      {searchQuery && (
        <div className="p-4 bg-blue-50 border-l-4 border-blue-400 mb-4">
          <p className="text-sm text-blue-700">
            Found {filteredTransactions.length} transaction(s) matching &ldquo;{searchQuery}&rdquo;
          </p>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-5">
          {/* Table Header */}
          <thead>
            <tr>
              <th className="w-2/5 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                <button 
                  className="flex items-center space-x-1 hover:text-gray-700 transition-colors"
                  onClick={() => handleSort('date')}
                >
                  <span>Date</span>
                  {getSortIcon('date')}
                </button>
              </th>
              <th className="w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                <button 
                  className="flex items-center space-x-1 hover:text-gray-700 transition-colors"
                  onClick={() => handleSort('remark')}
                >
                  <span>Remark</span>
                  {getSortIcon('remark')}
                </button>
              </th>
              <th className="w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                <button 
                  className="flex items-center space-x-1 hover:text-gray-700 transition-colors"
                  onClick={() => handleSort('amount')}
                >
                  <span>Amount</span>
                  {getSortIcon('amount')}
                </button>
              </th>
              <th className="w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                <button 
                  className="flex items-center space-x-1 hover:text-gray-700 transition-colors"
                  onClick={() => handleSort('currency')}
                >
                  <span>Currency</span>
                  {getSortIcon('currency')}
                </button>
              </th>
              <th className="w-3/20 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                <button 
                  className="flex items-center space-x-1 hover:text-gray-700 transition-colors"
                  onClick={() => handleSort('type')}
                >
                  <span>Type</span>
                  {getSortIcon('type')}
                </button>
              </th>
            </tr>
          </thead>
          
          <tbody className="bg-white divide-y divide-gray-100">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction, index) => (
                <tr key={`${transaction.date}-${index}`} className="hover:bg-gray-50 transition-colors">
                  <td className="w-1/4 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border-b border-gray-200">
                    {transaction.date}
                  </td>
                  <td className="w-1/4 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border-b border-gray-200">
                    {transaction.remark}
                  </td>
                  <td className={`w-1/4 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border-b border-gray-200 ${
                    transaction.amount.startsWith('-') ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {transaction.amount}
                  </td>
                  <td className="w-1/4 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border-b border-gray-200">
                    {transaction.currency}
                  </td>
                  <td className="w-1/4 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border-b border-gray-200">
                    <div className="flex items-center justify-center space-x-1 rounded-full bg-gray-100 px-3 py-1 w-fit mx-auto">
                      <Image
                        src={transaction.statusDot}
                        alt="Status"
                        width={6}
                        height={6}
                      />
                      <span className={`text-xs font-semibold ${
                        transaction.type === 'Credit' ? 'text-green-700' : 'text-red-700'
                      }`}>
                        {transaction.type}
                      </span>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  {searchQuery ? 'No transactions found matching your search.' : 'No transactions available.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}