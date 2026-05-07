import React, { useContext, useState } from 'react'
import Navbar from './Navbar'
import SideMenu from './SideMenu'
import { userContext } from '../../context/userContext';


const DashboardLayout = ({ children, activeMenu }) => {
    const { user } = useContext(userContext);
  return (
    <div className=''>
        <Navbar activeMenu={activeMenu} />
         
       {user && (
        <div className='flex'>
            <div className='max-[1080px]:hidden'>
                <SideMenu activeMenu={activeMenu}  />
            </div>

            <div className='grow mx-5'>
                {children}
            </div>
        </div>
       )}
    </div>
  )
}

export default DashboardLayout