import React, {useEffect, useState} from 'react'
import { LuPlus } from 'react-icons/lu'
import { prepareIncomeBarchartData } from '../../utils/helper'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import moment from 'moment'
import CustomBarChart from '../Charts/CustomBarChart'

const IncomeOverview = ({transactions, onAddIncome}) => {

    const [chartData, setChartData] = useState([]);

    useEffect(() => {
    const result = prepareIncomeBarchartData(transactions);
    setChartData(result);
        return () => {}
    }, [transactions]);



  return (
    <div className='card animate-fade-in'>
        <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
            <div>
                <h5 className='text-2xl font-bold text-gray-900'>Income Overview</h5>
                <p className='text-sm text-gray-500 mt-1'>Detailed analysis of your earnings and revenue streams</p>
            </div>

            <button className='add-btn add-btn-fill group' onClick={onAddIncome}>
                <LuPlus className='text-xl group-hover:rotate-90 transition-transform duration-300' />
                <span>Add Income</span>
            </button>
        </div>

        <div className='mt-10 '>
           <CustomBarChart 
           data={chartData}
           xAxisDataKey="month"
           />
        </div>
    </div> 
  )
}

export default IncomeOverview

