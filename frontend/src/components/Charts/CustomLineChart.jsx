import React from 'react'
import { XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area, AreaChart } from 'recharts'
import { addThousandsSeparator } from '../../utils/helper'

const CustomLineChart = ({data}) => {

    const CustomTooltip = ({active, payload}) => {
        if(active && payload && payload.length) {
            return (
                <div className='bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-xl border border-gray-100'>
                    <p className='text-xs font-bold text-gray-400 uppercase tracking-wider mb-1'>{payload[0].payload.category || 'Expense'}</p>
                    <p className='text-lg font-bold text-primary'>
                        ${addThousandsSeparator(payload[0].payload.amount)}
                    </p>
                </div>
            )
        }
        return null
    }
  return (
    <div className='w-full mt-6'>
        <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={data}>
            <defs>
                <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#875cf5" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#875cf5" stopOpacity={0} />
                </linearGradient>
            </defs>
               
               <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
               <XAxis 
                   dataKey="month" 
                   tick={{fontSize: 12, fill: "#94a3b8", fontWeight: 500}} 
                   axisLine={false}
                   tickLine={false}
                   dy={10}
               />
               <YAxis 
                   tick={{fontSize: 12, fill: "#94a3b8", fontWeight: 500}} 
                   axisLine={false}
                   tickLine={false}
               />
               <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#875cf5', strokeWidth: 2 }} />
               <Area 
                   type="monotone" 
                   dataKey="amount" 
                   stroke="#875cf5" 
                   fillOpacity={1} 
                   fill="url(#expenseGradient)" 
                   strokeWidth={4} 
                   dot={{ r: 4, fill: "#875cf5", stroke: "#fff", strokeWidth: 2 }} 
                   activeDot={{ r: 6, fill: "#875cf5", stroke: "#fff", strokeWidth: 2 }}
               />
            </AreaChart>
        </ResponsiveContainer>
    </div>
  )
  
}

export default CustomLineChart
