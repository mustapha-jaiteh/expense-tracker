import React from 'react'
import { LuDownload } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import moment from 'moment'

const IncomeList = ({transactions, onDelete, onDownload, onEdit}) => {
  return (
    <div className='card animate-fade-in'>
        <div className='flex items-center justify-between mb-6'>
            <h5 className='text-xl font-bold text-gray-800'>Income Sources</h5>
             
             <button className='card-btn group' onClick={onDownload}>
                <LuDownload className="text-lg group-hover:translate-y-0.5 transition-transform" /> 
                <span>Download Report</span>
             </button>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {transactions.map((income) => (
                <TransactionInfoCard 
                  key={income._id}
                  title={income.source}
                  icon={income.icon}
                  date={moment(income.date).format("Do MMM YYYY")}
                  amount={income.amount}
                  type="income"
                  onDelete={() => onDelete(income._id)}
                  onEdit={() => onEdit(income)}
                />
            ))}
        </div>
        {transactions.length === 0 && (
          <div className='text-center py-12 text-gray-400 font-medium'>
            No income records found.
          </div>
        )}
    </div>
  )
}

export default IncomeList
