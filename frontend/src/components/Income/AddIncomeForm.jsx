import React, { useState } from 'react'
import Input from "../inputs/Input.jsx"
import EmojiPickerPopup from '../EmojiPickerPopup.jsx'
import { LuPlus, LuSave } from 'react-icons/lu'


const AddIncomeForm = ({onAddIncome, initialData}) => {

  const [income, setIncome] = useState({
    source: initialData?.source || "", 
    amount: initialData?.amount || "",
    date: initialData?.date ? initialData.date.split('T')[0] : "",
    icon: initialData?.icon || "",
  })

  const handleChange = (key, value) => setIncome({...income, [key]: value});
   

  return (
    <div>
      <EmojiPickerPopup 
      icon={income.icon}
      onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      
      />

        <Input 
        value={income.source}
        onChange={({target}) =>handleChange("source", target.value)}
        label="Income Source"
        placeholder="Salary, Side Hustle, etc"
        type="text"
        />

        <Input 
        value={income.amount}
        onChange={({target}) =>handleChange("amount", target.value)}
        label="Amount"
        placeholder=""
        type="number"
        />

        <Input 
        value={income.date}
        onChange={({target}) =>handleChange("date", target.value)}
        label="Date"
        placeholder=""
        type="date"
        />

        <div className='flex justify-end mt-8'>
            <button 
            className="btn-primary flex items-center justify-center gap-2 max-w-[200px]"
            type='button'
            onClick={() => onAddIncome(initialData ? {...income, _id: initialData._id} : income)}
            >
             {initialData ? <LuSave className='text-lg' /> : <LuPlus className='text-lg' />}
             <span>{initialData ? "Update Income" : "Add Income"}</span>
            </button>
        </div>
    </div>
  )
}

export default AddIncomeForm
