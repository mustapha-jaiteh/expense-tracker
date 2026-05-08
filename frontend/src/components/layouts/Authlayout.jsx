import React from 'react'
import dashboard from "../../assets/images/dashboard.PNG"
import { LuTrendingUpDown } from "react-icons/lu"

const Authlayout = ({ children }) => {
  return (
    <div className='flex min-h-screen bg-bg-main overflow-hidden'>
      {/* Left Column: Form Content */}
      <div className='w-full md:w-[60vw] px-8 md:px-16 lg:px-24 py-12 flex flex-col justify-center animate-fade-in'>
        <div className='max-w-md w-full mx-auto'>
           <div className='flex items-center gap-2 mb-12'>
             <div className='w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20'>
               <LuTrendingUpDown className='text-white text-xl' />
             </div>
             <span className='text-2xl font-bold gradient-text'>ExpensePro</span>
           </div>
           {children}
        </div>
      </div>

      {/* Right Column: Visual Showcase */}
      <div className='hidden md:flex w-[40vw] bg-primary relative items-center justify-center overflow-hidden p-12'>
        {/* Decorative Circles */}
        <div className='absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl' />
        <div className='absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-primary-dark/30 rounded-full blur-3xl' />
        
        <div className='relative z-10 w-full flex flex-col items-center gap-8'>
            <div className='w-full max-w-sm animate-fade-in'>
                <StatsInfCard
                    icon={<LuTrendingUpDown />} 
                    label="Track Your Income & Expenses"
                    value="430,000"
                    color="bg-primary"
                />
            </div>
             
            <div className='relative w-full max-w-md mt-4 group'>
                <div className='absolute -inset-4 bg-white/20 rounded-[32px] blur-xl opacity-0 group-hover:opacity-100 transition-opacity' />
                <img
                    src={dashboard} 
                    alt="Admin Dashboard"
                    className='w-full relative z-10 shadow-2xl rounded-2xl border border-white/20 transform hover:-translate-y-2 transition-transform duration-500'
                />
            </div>
        </div>

        <div className='absolute bottom-8 text-center w-full px-8'>
          <p className='text-white/60 text-sm font-medium'>Join thousands of users managing their finances smarter.</p>
        </div>
      </div>
    </div>
  )
}

export default Authlayout

const StatsInfCard = ({ icon, label, value, color }) => {
  return (
    <div className='glass p-5 rounded-2xl flex items-center gap-4 border-white/30 transform hover:scale-[1.05] transition-transform duration-300'>
      <div className={`w-14 h-14 flex items-center justify-center text-2xl text-white ${color} rounded-2xl shadow-lg shadow-black/10`}>
        {icon}
      </div>

      <div>
        <h6 className='text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1'>
          {label}
        </h6>
        <span className='text-2xl font-bold text-gray-800'>${value}</span>
      </div>
    </div>
  )
}