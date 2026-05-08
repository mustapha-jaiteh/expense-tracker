import React from 'react'
import { LuDownload } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import moment  from 'moment'

const ExpenseList = ({transactions, onDelete, onDownload, onEdit}) => {
  return (
    <div className='card animate-fade-in'>
       <div className='flex items-center justify-between mb-6'>
          <h5 className='text-xl font-bold text-gray-800'>All Expenses</h5>

          <button className='card-btn group' onClick={onDownload}>
            <LuDownload className='text-lg group-hover:translate-y-0.5 transition-transform' /> 
            <span>Download Report</span>
          </button>
       </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
         {transactions.map((expense) => (
            <TransactionInfoCard 
              key={expense._id}
              title={expense.category}
              icon={expense.icon}
              date={moment(expense.date).format("Do MMM YYYY")}
              amount={expense.amount}
              type="expense"
              onDelete={() => onDelete(expense._id)}
              onEdit={() => onEdit(expense)}
            />
         ))}
        </div>
        {transactions.length === 0 && (
          <div className='text-center py-12 text-gray-400 font-medium'>
            No expense records found.
          </div>
        )}
    </div>
  )
}
 
export default ExpenseList