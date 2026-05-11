import React from 'react'
import { LuX } from 'react-icons/lu'

const Model = ({isOpen, onClose, title, children}) => {

 if(!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full p-4 overflow-y-auto overflow-x-hidden bg-gray-950/40 backdrop-blur-md animate-fade-in">
        <div className="relative w-full max-w-2xl max-h-full">
          {/* Model content */}
            <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
              

              {/*Model header */}
              <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900">
                  {title}
                </h3>

                <button
                  type="button"
                  className="text-gray-400 hover:text-primary bg-gray-50 hover:bg-primary/5 rounded-xl text-lg w-10 h-10 inline-flex justify-center items-center transition-all duration-300 transform hover:rotate-90 cursor-pointer"
                  onClick={onClose}
                >
                  <LuX />
                </button>  
              </div>

                {/** Model body */}
                <div className="p-4 md:p-5 space-y-4 ">
                  {children}
                </div>  
              </div>
           </div>
    </div>
  )
}

export default Model
