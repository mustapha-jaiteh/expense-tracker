import React from 'react'

const DeleteAlert = ({content, onDelete}) => {
  return (
    <div className='p-2'>
        <p className='text-gray-600 text-lg leading-relaxed'>{content}</p>

        <div className='flex justify-end gap-3 mt-8'>
            <button 
                type='button' 
                className='px-6 py-2.5 rounded-xl text-gray-500 font-semibold hover:bg-gray-100 transition-colors cursor-pointer'
                onClick={() => { /* This would be handled by the parent Model onClose */ }}
            >
              Cancel
            </button>
            <button 
                type='button' 
                className='bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/20 px-6 py-2.5 rounded-xl text-white text-sm font-bold transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer' 
                onClick={onDelete}
            >
              Delete
            </button>
        </div>
    </div>
  )
}

export default DeleteAlert
