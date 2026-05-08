import React from 'react'
import Input from '../inputs/Input'
import { useState } from 'react'
import EmojiPickerPopup from '../EmojiPickerPopup'
import { LuPlus, LuSave } from 'react-icons/lu'

const AddExpenseForm = ({onAddExpense, initialData}) => {

    const [expense, setExpense] = useState({
        category: initialData?.category || "",
        amount: initialData?.amount || "",
        date: initialData?.date ? initialData.date.split('T')[0] : "",
        icon: initialData?.icon || "",
    })

    const handleChange = (key, value) => {
        setExpense((prev) => ({
            ...prev,
            [key]: value,
        }))
    }
  return (
    <div>
        <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
        />

        <Input
        label="Category"
        type="text"
        value={expense.category}
        onChange={(e) => handleChange("category", e.target.value)}
        placeholder="Food, Rent, Shopping, etc"
        />

        <Input
        label="Amount"
        type="number"
        value={expense.amount}
        onChange={({target}) => handleChange("amount", target.value)}
        placeholder="0.00"
        />

        <Input
        label="Date"
        type="date"
        value={expense.date}
        onChange={({target}) => handleChange("date", target.value)}
        placeholder="Enter Date"
        />

        <div className='flex justify-end mt-8'>
            <button 
              className='btn-primary flex items-center justify-center gap-2 max-w-[200px]' 
              onClick={() => onAddExpense(initialData ? {...expense, _id: initialData._id} : expense)}
            >
                {initialData ? <LuSave className='text-lg' /> : <LuPlus className='text-lg' />}
                <span>{initialData ? "Update Expense" : "Add Expense"}</span>
            </button>
        </div>
    </div>
  )
}

export default AddExpenseForm