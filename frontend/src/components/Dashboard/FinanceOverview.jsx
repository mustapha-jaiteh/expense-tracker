import React from 'react'
import CustomPieChart from '../Charts/CustomPieChart';



 const COLORS = ["#875cf5", "#fA2C37", "#FF6900 "];

const FinanceOverview = ({ totalBalance, totalIncome, totalExpenses }) => {
   
    const balanceData = [
        { name: "Total Balance", amount: totalBalance, fill: COLORS[0] },
        { name: "Total Income", amount: totalIncome, fill: COLORS[1] },
        { name: "Total Expenses", amount: totalExpenses, fill: COLORS[2] },
    ]; 
   
  return (
    <div className='card'>
        <div className='flex items-center justify-between mb-5'>
            <h5 className='text-lg'>Finance Overview</h5>
        </div>

        <CustomPieChart 
        data={balanceData}
        colors={COLORS}
        label="Total Balance"
        totalAmount={totalBalance}
        showTextAnchor
        /> 
       
    </div>
  )
}

export default FinanceOverview
