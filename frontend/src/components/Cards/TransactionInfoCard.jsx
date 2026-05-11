import React from 'react'
import { LuUtensils, LuTrendingUp, LuTrendingDown, LuTrash2, LuPen } from 'react-icons/lu'
import { addThousandsSeparator } from '../../utils/helper'

const TransactionInfoCard = ({ title, icon, amount, date, type, hideDeleteBtn, onDelete, onEdit }) => {

    const getAmountStyles = () => {
        return type === "income" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600";
    }

    return (
        <div className='group relative flex items-center gap-3 md:gap-4 mt-2 p-3 md:p-4 rounded-xl md:rounded-2xl transition-all duration-300 hover:bg-gray-50 border border-transparent hover:border-gray-100'>
            <div className='w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-xl md:text-2xl bg-gray-100/80 rounded-lg md:rounded-xl group-hover:scale-110 transition-transform duration-300 shrink-0'>
                {icon ? (
                    typeof icon === 'string' && (icon.startsWith('http') || icon.startsWith('data:')) ? (
                        <img src={icon} alt={title} className='w-5 h-5 md:w-6 md:h-6' />
                    ) : (
                        <span className='text-xl md:text-2xl'>{icon}</span>
                    )
                ) : (
                    <LuUtensils className='' />
                )}
            </div>

            <div className='flex-1 flex flex-col md:flex-row md:items-center justify-between min-w-0'>
                <div className='truncate'>
                    <p className='text-sm md:text-[15px] text-gray-900 font-bold truncate'>{title}</p>
                    <span className='text-gray-400 text-[10px] md:text-xs font-medium mt-0.5 block'>{date}</span>
                </div>

                <div className='flex items-center justify-between md:justify-end gap-2 mt-2 md:mt-0'>
                    <div className='flex items-center gap-2'>
                        {!hideDeleteBtn && (
                            <button className='text-gray-400 hover:text-primary md:opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer p-1'
                                onClick={onEdit}
                            >
                                <LuPen size={16} />
                            </button>
                        )}
                        {!hideDeleteBtn && (
                            <button className='text-gray-400 hover:text-red-500 md:opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer p-1'
                                onClick={onDelete}
                            >
                                <LuTrash2 size={16} />
                            </button>
                        )}
                    </div>

                    <div className={`flex items-center gap-2 md:gap-3 px-3 py-1.5 md:px-4 md:py-2 rounded-lg md:rounded-xl border ${type === "income" ? "bg-emerald-50 border-emerald-100 text-emerald-600" : "bg-rose-50 border-rose-100 text-rose-600"}`}>
                        <h6 className='text-xs md:text-sm font-bold whitespace-nowrap'>
                            {type === "income" ? "+" : "-"} ${addThousandsSeparator(amount)}
                        </h6>

                        {type === "income" ? (
                            <LuTrendingUp className='text-emerald-500 text-xs md:text-base' />
                        ) : (
                            <LuTrendingDown className='text-rose-500 text-xs md:text-base' />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default TransactionInfoCard

