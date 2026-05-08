import React, { useState } from 'react'
import {HiOutlineMenu, HiOutlineX} from "react-icons/hi";
import { LuTrendingUpDown } from 'react-icons/lu';
import SideMenu from './SideMenu';

const Navbar = ({activeMenu}) => {
    const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <div className='flex items-center gap-5 glass py-4 px-7 sticky top-0 z-50 border-x-0 border-t-0 rounded-none'>
       <button 
       className='block lg:hidden text-gray-600 hover:text-primary transition-colors'
       onClick={() => {
        setOpenSideMenu(!openSideMenu)
       }}
       >
        {openSideMenu ? <HiOutlineX className='text-2xl' /> : <HiOutlineMenu className='text-2xl' />}
       </button>

       <div className='flex items-center gap-2'>
         <div className='w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20'>
           <LuTrendingUpDown className='text-white text-lg' />
         </div>
         <h2 className='gradient-text text-xl'>ExpensePro</h2>
       </div>

       {openSideMenu && (
        <div className='fixed top-[61px] left-0 w-64 bg-white/95 backdrop-blur-lg border-r border-gray-200 h-screen animate-fade-in'>
            <SideMenu activeMenu={activeMenu} />
        </div>
       )}
    </div>
    
  )
}


export default Navbar