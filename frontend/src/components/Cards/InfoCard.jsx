import React from 'react'

const InfoCard = ({label, value, icon, color}) => {
  return (
    <div className='card flex gap-6 transform hover:scale-[1.02] transition-all duration-300'>
        <div className={`w-16 h-16 flex items-center justify-center text-3xl text-white rounded-2xl ${color} shadow-lg shadow-black/10`}>
          {icon}
        </div>
        <div>
          <h6 className='text-gray-400 text-xs font-bold uppercase tracking-wider mb-1'>{label}</h6>
          <span className='text-3xl font-bold text-gray-800'>${value}</span>
        </div> 
    </div>
  )
}

export default InfoCard
