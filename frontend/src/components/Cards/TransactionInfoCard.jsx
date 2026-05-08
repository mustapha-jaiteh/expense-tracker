import React from 'react'
import { LuUtensils, LuTrendingUp, LuTrendingDown, LuTrash2, LuPen } from 'react-icons/lu'
import { addThousandsSeparator } from '../../utils/helper'

const TransactionInfoCard = ({ title, icon, amount, date, type, hideDeleteBtn, onDelete, onEdit }) => {

    const getAmountStyles = () => {
        return type === "income" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600";
    }

    return (
        <div className='group relative flex items-center gap-4 mt-2 p-4 rounded-2xl transition-all duration-300 hover:bg-gray-50 border border-transparent hover:border-gray-100'>
            <div className='w-12 h-12 flex items-center justify-center text-2xl bg-gray-100/80 rounded-xl group-hover:scale-110 transition-transform duration-300'>
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
                    <p className='text-[15px] text-gray-900 font-bold'>{title}</p>
                    <span className='text-gray-400 text-xs font-medium mt-0.5 block'>{date}</span>
                </div>
            </div>

            <div className='flex items-center gap-2'>
                {!hideDeleteBtn && (
                    <button className='text-gray-400 hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer'
                        onClick={onEdit}
                    >
                        <LuPen size={18} />
                    </button>
                )}
                {!hideDeleteBtn && (
                    <button className='text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer'
                        onClick={onDelete}
                    >
                        <LuTrash2 size={18} />
                    </button>
                )}

                <div className={`flex items-center gap-3 px-4 py-2 rounded-xl border ${type === "income" ? "bg-emerald-50 border-emerald-100 text-emerald-600" : "bg-rose-50 border-rose-100 text-rose-600"}`}>
                    <h6 className='text-sm font-bold'>
                        {type === "income" ? "+" : "-"} ${addThousandsSeparator(amount)}
                    </h6>

                    {type === "income" ? (
                        <LuTrendingUp className='text-emerald-500' />
                    ) : (
                        <LuTrendingDown className='text-rose-500' />
                    )}
                </div>
            </div>
        </div>
    )
}


export default TransactionInfoCard

