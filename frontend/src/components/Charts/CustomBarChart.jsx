import React, { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell} from 'recharts'
import { addThousandsSeparator } from '../../utils/helper'


const CustomBarChart = ({ data, xAxisDataKey = "category" }) => {


    const [barSize, setBarSize] = useState(24);
    
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) { // lg
                setBarSize(56);
            } else if (window.innerWidth >= 768) { // md
                setBarSize(40);
            } else {
                setBarSize(24);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    //function to alternate colors
    const getBarColor = (index) => {
        return index % 2 === 0 ? "#875cf5" : "#cfbefb"
    }

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className='bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-xl border border-gray-100'>
                    <p className='text-xs font-bold text-gray-400 uppercase tracking-wider mb-1'>
                        {payload[0].payload.month || payload[0].payload.category || payload[0].payload.source}
                    </p>
                    <p className='text-lg font-bold text-primary'>
                        ${addThousandsSeparator(payload[0].payload.amount)}
                    </p>
                </div>
            )
        }
        return null;
    }


    return (
        <div className='w-full mt-6'>
            <ResponsiveContainer width="100%" height={350}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis 
                        dataKey={xAxisDataKey} 
                        tick={{ fontSize: 12, fill: "#94a3b8", fontWeight: 500 }} 
                        axisLine={false}
                        tickLine={false}
                        dy={10}
                    />
                    <YAxis 
                        tick={{ fontSize: 12, fill: "#94a3b8", fontWeight: 500 }} 
                        axisLine={false}
                        tickLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
                    <Bar
                        dataKey="amount"
                        fill="var(--color-primary)"
                        radius={[8, 8, 0, 0]}
                        barSize={barSize}
                    >
                        {data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#875cf5" : "#c4b5fd"} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default CustomBarChart
