import React from 'react'
import { LuUtensils, LuTrendingUp, LuTrendingDown, LuTrash2 } from 'react-icons/lu'
import { addThousandsSeparator } from '../../utils/helper'

const TransactionInfoCard = ({ title, icon, amount, date, type, hideDeleteBtn, onDelete }) => {

    const getAmountStyles = () => {
        return type === "income" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600";
    }

    return (
        <div className='group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/60'>
            <div className='w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full'>
                {icon ? (
                    typeof icon === 'string' && (icon.startsWith('http') || icon.startsWith('data:')) ? (
                        <img src={icon} alt={title} className='w-6 h-6' />
                    ) : (
                        <span className='text-2xl'>{icon}</span>
                    )
                ) : (
                    <LuUtensils className='' />
                )}
            </div>

            <div className='flex-1 flex items-center justify-between'>
                <div className=''>
                    <p className='text-sm text-gray-700 font-medium'>{title}</p>
                    <span className='text-gray-400 text-xs mt-1'>{date}</span>
                </div>
            </div>

            <div className='flex items-center gap-2'>
                {!hideDeleteBtn && (
                    <button className='text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer'
                        onClick={onDelete}
                    >
                        <LuTrash2 size={18} />
                    </button>
                )}

                <div className={`flex items-center gap-4 px-3 py-1.5 rounded-md ${getAmountStyles()}`}>
                    <h6 className='text-xs font-semibold'>
                        {type === "income" ? "+" : "-"} D{addThousandsSeparator(amount)}
                    </h6>

                    {type === "income" ? (
                        <LuTrendingUp className='text-green-500' />
                    ) : (
                        <LuTrendingDown className='text-red-500' />
                    )}
                </div>
            </div>
        </div>
    )
}


export default TransactionInfoCard

