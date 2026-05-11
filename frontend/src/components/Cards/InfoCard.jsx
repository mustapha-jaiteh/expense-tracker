import React from 'react'

const InfoCard = ({label, value, icon, color}) => {
  return (
    <div className='card flex items-center gap-4 md:gap-6 transform hover:scale-[1.02] transition-all duration-300'>
        <div className={`w-12 h-12 md:w-16 md:h-16 flex items-center justify-center text-2xl md:text-3xl text-white rounded-xl md:rounded-2xl ${color} shadow-lg shadow-black/10 flex-shrink-0`}>
          {icon}
        </div>
        <div className="min-w-0">
          <h6 className='text-gray-400 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-1 truncate'>{label}</h6>
          <span className='text-xl md:text-3xl font-bold text-gray-800 break-words'>${value}</span>
        </div> 
    </div>
  )
}

export default InfoCard
