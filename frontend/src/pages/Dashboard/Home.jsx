import React from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useUserAuth } from '../../hooks/useUserAuth'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axiosInstance from '../../utils/axiosinstance'
import { API_PATHS } from '../../utils/apiPaths'
import { LuHandCoins, LuWalletMinimal } from 'react-icons/lu'
import InfoCard from '../../components/Cards/InfoCard'
import {IoMdCard} from 'react-icons/io'
import { addThousandsSeparator } from '../../utils/helper'
import RecentTransactions from '../../components/Dashboard/RecentTransactions'
import FinanceOverview from '../../components/Dashboard/FinanceOverview'
import ExpenseTransections from '../../components/Dashboard/ExpenseTransections'
import Last30DaysExpenses from '../../components/Dashboard/Last30DaysExpenses'
import RecentIncomeWithChart from '../../components/Dashboard/RecentIncomeWithChart'
import RecentIncome from '../../components/Dashboard/RecentIncome'

const Home = () => {
 useUserAuth();
 
 const navigate = useNavigate();

 const [dashboardData, setDashboarddata] = useState(null);
 const [loading, setLoading] = useState(false);

 const fetchDashboardData = async () => {
  if(loading) return;

  setLoading(true);
    try {
        const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
        if(response.data) {
            setDashboarddata(response.data);
        }
    } catch (error) {
        console.log("Error fetching dashboard data:", error);
    } finally {
        setLoading(false);
    }
 };

 useEffect(() => {
    fetchDashboardData();
    return () => {}
 }, []);
  return (
    <DashboardLayout activeMenu="Dashboard" >
        <div className='my-5 px-4 md:px-0 mx-auto'>
         <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
           <InfoCard
            label="Total Balance"
            value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
            icon={<IoMdCard />}
            color="bg-primary"
           />

           <InfoCard
            label="Total Income"
            value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
            icon={<LuWalletMinimal />}
            color="bg-orange-500"
           />

           <InfoCard
            label="Total Expense"
            value={addThousandsSeparator(dashboardData?.totalExpenses || 0)}
            icon={<LuHandCoins />}
            color="bg-red-500"
           />
         </div> 
         <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
            <RecentTransactions 
            transactions={dashboardData?.recentTransactions}
            onSeeMore={() => navigate("/expense")}
            />

            <FinanceOverview 
            totalBalance={dashboardData?.totalBalance || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpenses={dashboardData?.totalExpenses || 0}
            />

            <ExpenseTransections 
            transactions={dashboardData?.expenseLast30Days?.transactions || [ ]}
            onSeeMore={() => navigate("/expense")}
            />

            <Last30DaysExpenses 
            data={dashboardData?.expenseLast30Days?.transactions || []}
            />

            <RecentIncomeWithChart 
               data={dashboardData?.incomeLast60Days?.transactions.slice(0,4) || []}
               totalIncome={dashboardData?.totalIncome || 0}
            />

            <RecentIncome
              transactions={dashboardData?.incomeLast60Days?.transactions || []}
              onSeeMore={() => navigate("/income")}
            />
         </div>
        </div>
    </DashboardLayout>
  )

}

export default Home