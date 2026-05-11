import React from 'react'

const CustomLegend = ({payload}) => {
  return (
    <div className='flex flex-wrap items-center justify-center gap-x-4 md:gap-x-6 gap-y-2 mt-4'>
        {payload?.map((entry, index) => (
            <div key={`legend-${index}`} className='flex items-center space-x-2'>
                <div className='w-2.5 h-2.5 rounded-full' style={{backgroundColor: entry.color}}></div>
                <span className='text-xs text-gray-700 font-medium'>{entry.value}</span>
            </div>
        ))}
    </div>
  )
}

export default CustomLegend