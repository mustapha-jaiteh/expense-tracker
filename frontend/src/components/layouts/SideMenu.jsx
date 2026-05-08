import React, { useContext } from 'react'
import { SIDE_MENU_ITEMS } from '../../utils/data'
import { userContext } from '../../context/userContext'
import { useNavigate } from 'react-router-dom'
import CharAvatar from '../Cards/CharAvatar'
import { BASE_URL } from '../../utils/apiPaths'

const SideMenu = ({ activeMenu }) => {
    const {user, clearUser} = useContext(userContext)
 const navigate = useNavigate();

 const handleClick = (route) => {
   if(route === "/logout") {
     handleLogout();
     return;
   }
   navigate(route);
 }

 const handleLogout = () => {
    localStorage.clear(); 
    clearUser();
    navigate("/login");
 } 
   return (
    <div className='w-64 h-[calc(100vh-61px)] glass border-r-0 border-t-0 p-6 sticky top-[61px] z-20 rounded-none'>
      <div className='flex flex-col items-center justify-center gap-4 mt-4'>
       <div className='relative group'>
        <div className='absolute -inset-1 bg-gradient-to-tr from-primary to-purple-400 rounded-full blur opacity-25 group-hover:opacity-50 transition-opacity' />
       {user?.profileImageUrl ? (
        <img 
          src={user.profileImageUrl.startsWith("http") ? user.profileImageUrl : `${BASE_URL}${user.profileImageUrl}`} 
          alt="Profile Image" 
          className='w-20 h-20 rounded-full object-cover bg-slate-400' 
        />
       ) : (
        <CharAvatar 
        fullName={user?.fullName}
        width="w-20"
        height="h-20"
        styte="text-xl"
        />
       )}
       </div>

       <div className='text-center mb-8'>
          <h5 className='text-gray-900 font-bold text-lg'>
           {user?.fullName || "Welcome!"}
          </h5>
          <p className='text-xs text-gray-400 font-medium'>Manage your funds</p>
       </div>

       <div className='w-full space-y-2'>
       {SIDE_MENU_ITEMS.map((item, index) => (
        <button
         key={`menu_${index}`}
         className={`${activeMenu === item.label ? "nav-item-active" : "nav-item"}`}
         onClick={() => handleClick(item.path)}
        >
            <span className='text-xl'>{item.icon}</span>
            <span className='font-semibold'>{item.label}</span>
        </button>
       ))}
       </div>
      </div>
    </div>
  )
}

export default SideMenu