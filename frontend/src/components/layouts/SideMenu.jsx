import React, { useContext } from 'react'
import { SIDE_MENU_ITEMS } from '../../utils/data'
import { userContext } from '../../context/userContext'
import { useNavigate } from 'react-router-dom'
import CharAvatar from '../Cards/CharAvatar'

const SideMenu = ({ activeMenu }) => {
    const {user, clearUser} = useContext(userContext)
 const navigate = useNavigate();

 const handleClick = (route) => {
   if(route === "logout") {
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
    <div className='w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky  top-[61px] z-20'>
      <div className='flex flex-col items-center justify-center gap-3 mt-3'>
       {user?.profileImageUrl ? (
        <img src={user.profileImageUrl || ""} alt="Profile Image" className='w-20 h-20 rounded-full object-cover bg-slate-400' />
       ) : (
        <CharAvatar 
        fullName={user?.fullName}
        width="w-20"
        height="h-20"
        styte="text-xl"
        />
       )}

       <h5 className='text-gray-950 font-medium leading-6'>
        {user?.fullName || ""}
       </h5>

       {SIDE_MENU_ITEMS.map((item, index) => (
        <button
         key={`menu_${index}`}
         className={`w-full flex items-center gap-4 text-[15px] ${activeMenu === item.label ? "text-white bg-primary " : ""} rounded-lg px-6 py-3 mb-3 hover:bg-purple-200 `}
         onClick={() => handleClick(item.path)}
        >
            <span className='text-xl'>{item.icon}</span>
            {item.label}
        </button>
       ))}
      </div>
    </div>
  )
}

export default SideMenu