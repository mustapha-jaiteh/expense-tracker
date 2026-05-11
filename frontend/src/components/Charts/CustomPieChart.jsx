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
                    innerRadius={window.innerWidth < 768 ? 80 : 100}
                    outerRadius={window.innerWidth < 768 ? 110 : 130}
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
                    fontSize={window.innerWidth < 768 ? "12px" : "14px"}
                  
                    >
                        {label}
                    </text>

                    <text
                    x="50%"
                    y="50%"
                    dy={window.innerWidth < 768 ? 5 : 8}
                    textAnchor="middle"
                    fill='#333'
                    fontSize={window.innerWidth < 768 ? "20px" : "24px"}
                    fontWeight="semibold"
                  
                    >
                       ${addThousandsSeparator(totalAmount)}
                    </text> 
                    </>
                )}
            </PieChart>
        </ResponsiveContainer>
    </div>
  )
}

export default CustomPieChart