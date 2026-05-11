import React from 'react'
import { useUserAuth } from '../../hooks/useUserAuth'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import axiosInstance from '../../utils/axiosinstance'
import { API_PATHS } from '../../utils/apiPaths'
import { useState } from 'react'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import ExpenseOverview from '../../components/Expense/ExpenseOverview'
import Model from '../../components/Model'
import AddExpenseForm from '../../components/Expense/AddExpenseForm'
import ExpenseList from '../../components/Expense/ExpenseList'
import DeleteAlert from '../../components/DeleteAlert'

const Expense = () => {

    useUserAuth();

     const [expenseData, setExpenseData] = useState([]);
     const [loading, setLoading] = useState(false);
     const [openDeleteAlert, setOpenDeleteAlert] = useState(
       {
         show: false,
         data: null,
       }
     );
    const [openAddExpenseModel, setOpenAddExpenseModel] = useState(false); 
    const [editExpenseData, setEditExpenseData] = useState(null); 

     // get all Expense details
 const fetchExpenseDetails = async () => {
   if(loading) return;
   setLoading(true);
  try {
    const response = await axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE);
    if(response.data) {
      setExpenseData(response.data);
    }
  } catch (error) {
    console.log("Error fetching expense details:", error);
  } finally {
    setLoading(false);
  }
 }

 // handle add expense
 const handleAddExpense = async (expense) => {
     const {category, amount, date, icon} = expense;

     //validation checks
     if(!category.trim()) {
       toast.error("category is required")
       return
     }

     if(!amount || isNaN(amount) || Number(amount) <= 0) {
     toast.error("Amount should be a valid number greater than 0")
     return
     }

     if(!date) {
      toast.error("Date is required")
      return
     }

     try {
      if (expense._id) {
          await axiosInstance.put(API_PATHS.EXPENSE.UPDATE_EXPENSE(expense._id), {
            category,
            amount, 
            date,
            icon,
          })
      } else {
          await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
            category,
            amount, 
            date,
            icon,
          })
      }
      setOpenAddExpenseModel(false)
      setEditExpenseData(null)
      toast.success(expense._id ? "Expense updated successfully" : "Expense added successfully")
      fetchExpenseDetails()
     }catch(error) {
      console.error("error adding/updating expense", error.response?.data?.message || error.message)
     }
 }

 const handleEditExpense = (expense) => {
   setEditExpenseData(expense)
   setOpenAddExpenseModel(true)
 }

 // delete expense 
 const deleteExpense = async (id) => {    
   try {
    await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id))

    setOpenDeleteAlert({show: false, data: null})
    toast.success("Expense details deleted successfully")
    fetchExpenseDetails()
    
   } catch (error) {
    console.error("Error deleting the Expense data", error.response?.data?.message || error.message)
    
   }
 }

 // handle download expense details
 const handleDownloadExpenseDetails = async () => {
  try {
    const response = await axiosInstance.get(
      API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
      {
        responseType: "blob",
      }
    )

    // create a url for the blob
    const url = window.URL.createObjectURL( new Blob([response.data]))
    const link = document.createElement("a")
    link.href = url;
    link.setAttribute("download", "expense_details.xlsx")
    document.body.appendChild(link)
    link.click()
    link.parentNode.removeChild(link)
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error("Error downloading the expense data", error )
    toast.error("Failed to download expense data. Please try again")
  }
 }

 useEffect(() => {
  fetchExpenseDetails();
  return () => {}
 }, []);

  return (
     <DashboardLayout activeMenu="Expense">
        <div className='my-5 px-4 md:px-0 mx-auto'>
           <div className='grid grid-cols-1 gap-6'>
            <div className=''>
              <ExpenseOverview 
              transactions={expenseData}
              onExpenseIncome={() => {
                setEditExpenseData(null)
                setOpenAddExpenseModel(true)
              }}
              />
            </div>

            <ExpenseList 
            transactions={expenseData}
            onDelete={(id) => setOpenDeleteAlert({show: true, data: id})}
            onDownload={handleDownloadExpenseDetails}
            onEdit={handleEditExpense}
            />
           </div>

           <Model
           isOpen={openAddExpenseModel}
           onClose={() => {
             setOpenAddExpenseModel(false)
             setEditExpenseData(null)
           }}
           title={editExpenseData ? "Edit Expense" : "Add Expense"}
           >
            <AddExpenseForm
            initialData={editExpenseData}
            onAddExpense={handleAddExpense}
            />
           </Model>
             <Model 
           isOpen={openDeleteAlert.show}
           onClose={() => setOpenDeleteAlert({show: false, data: null})}
           title="Delete Expense"
           >
            <DeleteAlert 
            content="Are you sure you want to delete this expense details"
            onDelete={() => deleteIncome(openDeleteAlert.data)}
            />
          </Model>
        </div>
     </DashboardLayout>
  )
}

export default Expense