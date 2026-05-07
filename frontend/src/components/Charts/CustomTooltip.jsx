import React from 'react'

const CustomTooltip = ({active, payload}) => {
  if(active && payload && payload.length) {
    return (
        <div className='bg-white rounded-lg shadow-md border border-gray-300 p-2'>
            <p className='text-xs font-semibold text-purple-800'>{payload[0].name}</p>
            <p className='text-sm text-gray-600 '>
                Amount:
                <span className='text-sm font-medium text-gray-900 ml-2'>{payload[0].value}</span>
                </p>
        </div>
    ) 
  }
  return null;
}

export default CustomTooltip