import React from 'react'

const DeleteAlert = ({content, onDelete}) => {
  return (
    <div className=''>
        <p className=''>{content}</p>

        <div className='flex justify-end mt-6'>
            <button type='button' className='bg-red-500 flex items-center px-4 py-2 rounded-lg text-white text-xs md:text-sm font-medium' onClick={onDelete}>Delete</button>
        </div>
      
    </div>
  )
}

export default DeleteAlert
