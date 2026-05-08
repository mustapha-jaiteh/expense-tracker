import React from 'react'
import {PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend} from 'recharts';
import CustomTooltip from './CustomTooltip';
import CustomLegend from './CustomLegend';


const CustomPieChart = ({data, colors, label, totalAmount, showTextAnchor}) => {
  return (
    <div className='w-full'>
        <div className='flex items-center justify-between mb-6'>
            <h5 className='text-xl font-bold text-gray-800'>{label}</h5>
            <span className='px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-bold uppercase tracking-wider'>
              Total: ${totalAmount}
            </span>
        </div>

        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={100}
                    outerRadius={130}
                    labelLine={false}
                    dataKey="amount"
                    nameKey="name"
                />
                <Tooltip content={<CustomTooltip />} /> 
                <Legend content={<CustomLegend />} />
                {showTextAnchor && (
                    <>
                    <text
                    x="50%"
                    y="50%"
                    dy={-25}
                    textAnchor="middle"
                    fill='#666'
                    fontSize="14px"
                  
                    >
                        {label}
                    </text>

                    <text
                    x="50%"
                    y="50%"
                    dy={8}
                    textAnchor="middle"
                    fill='#333'
                    fontSize="24px"
                    fontWeight="semibold"
                  
                    >
                       D{totalAmount}
                    </text> 
                    </>
                )}
            </PieChart>
        </ResponsiveContainer>
    </div>
  )
}

export default CustomPieChart