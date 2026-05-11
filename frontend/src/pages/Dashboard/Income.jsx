import React, {useEffect, useState} from 'react'
import { useUserAuth } from '../../hooks/useUserAuth'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import IncomeOverview from '../../components/Income/IncomeOverview'
import axiosInstance from '../../utils/axiosinstance'
import { API_PATHS } from '../../utils/apiPaths'
import Model from '../../components/Model'
import AddIncomeForm from '../../components/Income/AddIncomeForm'
import IncomeList from '../../components/Income/IncomeList'
import DeleteAlert from '../../components/DeleteAlert'
import toast from 'react-hot-toast'

const Income = () => {
   useUserAuth();

  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(
    {
      show: false,
      data: null,
    }
  );
 const [openAddIncomeModel, setOpenAddIncomeModel] = useState(false); 
 const [editIncomeData, setEditIncomeData] = useState(null); 
 
 // get all income details
 const fetchIncomeDetails = async () => {
   if(loading) return;
   setLoading(true);
  try {
    const response = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME);
    if(response.data) {
      setIncomeData(response.data);
    }
  } catch (error) {
    console.log("Error fetching income details:", error);
  } finally {
    setLoading(false);
  }
 }

 // handle add income
 const handleAddIncome = async (income) => {
     const {source, amount, date, icon} = income;

     //validation checks
     if(!source.trim()) {
       toast.error("Source is required")
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
      if (income._id) {
        await axiosInstance.put(API_PATHS.INCOME.UPDATE_INCOME(income._id), {
          source,
          amount, 
          date,
          icon,
        })
      } else {
        await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
          source,
          amount, 
          date,
          icon,
        })
      }
      setOpenAddIncomeModel(false)
      setEditIncomeData(null)
      toast.success(income._id ? "Income updated successfully" : "Income added successfully")
      fetchIncomeDetails()
     }catch(error) {
      console.error("error adding/updating income", error.response?.data?.message || error.message)
     }
 }

 const handleEditIncome = (income) => {
   setEditIncomeData(income)
   setOpenAddIncomeModel(true)
 }

 // delete income
 const handleDeleteIncome = async (id) => {    
   try {
    await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id))

    setOpenDeleteAlert({show: false, data: null})
    toast.success("Income details deleted successfully")
    fetchIncomeDetails()
    
   } catch (error) {
    console.error("Error deleting the Income data", error.response?.data?.message || error.message)
    
   }
 }

 // handle download income details
 const handleDownloadIncomeDetails = async () => {
     try {
    const response = await axiosInstance.get(
      API_PATHS.INCOME.DOWNLOAD_INCOME,
      {
        responseType: "blob",
      }
    )

    // create a url for the blob
    const url = window.URL.createObjectURL( new Blob([response.data]))
    const link = document.createElement("a")
    link.href = url;
    link.setAttribute("download", "income_details.xlsx")
    document.body.appendChild(link)
    link.click()
    link.parentNode.removeChild(link)
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error("Error downloading the income data", error )
    toast.error("Failed to download income data. Please try again")
  }
 }

 useEffect(() => {
  fetchIncomeDetails();
  return () => {}
 }, []);

  return (
    <DashboardLayout activeMenu="Income">
        <div className='my-5 px-4 md:px-0 mx-auto'>
            <div className='grid grid-cols-1 gap-6'>
                <div className=''>
                    <IncomeOverview 
                    transactions={incomeData}
                    onAddIncome={() => {
                      setEditIncomeData(null)
                      setOpenAddIncomeModel(true)
                    }}
                    />
                </div>

                <IncomeList
                transactions={incomeData}
                onDelete={(id) => {
                  setOpenDeleteAlert({show: true, data: id})
                }}
                onDownload={handleDownloadIncomeDetails}
                onEdit={handleEditIncome}
                 />

            </div>
           
           <Model 
           isOpen={openAddIncomeModel}
           onClose={() => {
             setOpenAddIncomeModel(false)
             setEditIncomeData(null)
           }}
           title={editIncomeData ? "Edit Income" : "Add Income"}
           >
          <AddIncomeForm 
          initialData={editIncomeData}
          onAddIncome={handleAddIncome}
          />
           </Model> 

           <Model 
           isOpen={openDeleteAlert.show}
           onClose={() => setOpenDeleteAlert({show: false, data: null})}
           title="Delete Income"
           >
            <DeleteAlert 
            content="Are you sure you want to delete this income details"
            onDelete={() => handleDeleteIncome(openDeleteAlert.data)}
            />
          </Model>
        </div>
    </DashboardLayout>
  )
}

export default Income