import React, { useEffect, useState } from 'react'
import { LuPlus } from 'react-icons/lu'
import { prepareExpenseLineChartData } from '../../utils/helper'
import CustomLineChart from '../Charts/CustomLineChart'

const ExpenseOverview = ({transactions, onExpenseIncome}) => {
 
    const [chartData, setChartData] = useState([])

    useEffect(() => {
         const result = prepareExpenseLineChartData(transactions) 
         setChartData(result)

         return () => {}
    },[transactions])


  return (
    <div className='card animate-fade-in'>
        <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
            <div className=''>
                <h5 className='text-2xl font-bold text-gray-900'>Expense Overview</h5>
                <p className='text-sm text-gray-500 mt-1'>Track your spending trends and analyze your top categories</p>
            </div>

            <button className='add-btn add-btn-fill group' onClick={onExpenseIncome}>
                <LuPlus className='text-xl group-hover:rotate-90 transition-transform duration-300' />
                <span>Add Expense</span>
            </button>
        </div>
       
       <div className=''>
          <CustomLineChart 
          data={chartData}
          />
       </div>

    </div>
  )
} 

export default ExpenseOverview