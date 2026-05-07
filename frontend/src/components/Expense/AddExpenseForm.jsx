import React from 'react'
import Input from '../inputs/Input'
import { useState } from 'react'
import EmojiPickerPopup from '../EmojiPickerPopup'

const AddExpenseForm = ({onAddExpense}) => {

    const [income, setIncome] = useState({
        category: "",
        amount: "",
        date: "",
        icon: "",
    })

    const handleChange = (key, value) => {
        setIncome((prev) => ({
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
        value={income.category}
        onChange={(e) => handleChange("category", e.target.value)}
        placeholder="Enter Category"
        />

        <Input
        label="Amount"
        type="number"
        value={income.amount}
        onChange={({target}) => handleChange("amount", target.value)}
        placeholder="0.00"
        />

        <Input
        label="Date"
        type="date"
        value={income.date}
        onChange={({target}) => handleChange("date", target.value)}
        placeholder="Enter Date"
        />

        <div className='flex justify-end mt-6'>
            <button className='add-btn add-btn-fill' onClick={() => onAddExpense(income)}>
                Add Expense
            </button>
        </div>
    </div>
  )
}

export default AddExpenseForm