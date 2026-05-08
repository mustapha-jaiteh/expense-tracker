import Income from "../models/Income.js";
import Expense from "../models/Expense.js";
import { Types } from "mongoose";
import { catchAsync } from "../utils/catchAsync.js";

export const getDashboardData = catchAsync(async (req, res) => {
    const userId = req.user?._id;

    if (!userId) {
        throw new ApiError(401, "User not authenticated or found");
    }

    const userObjectId = new Types.ObjectId(String(userId));

    // Fetch total income & expenses
    const totalIncome = await Income.aggregate([
    { 
        $match: {userId: userObjectId}
    },
    {
        $group: {_id: null, total: {$sum: "$amount"}}
    }
    ]);

    const totalExpenses = await Expense.aggregate([
    {
        $match: {userId: userObjectId} 
    },
    {
        $group: {_id: null, total: {$sum: "$amount"}}
    }
    ]);
    
    // Get income trnsactions in the last 60 days
    const last60DaysIncomeTransactions = await Income.find({
    userId,
    date: {
        $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000)
    }
    }).sort({date: -1});

    //Get total Income for the last 60 days 
    const incomeLast60Days = last60DaysIncomeTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);


    //Get expense transections in the last 30 days
    const lat30DaysExpenseTranstactions = await Expense.find({
    userId,
    date: {$gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)}
    }).sort({date: -1});

    //Get total Expense for the last 30 days
    const expenseLast30Days = lat30DaysExpenseTranstactions.reduce((sum, transaction) => sum + transaction.amount, 0);

    // Fetch last 5 transactions [income + expense]
    const lastIncomeTransactions = await Income.find({userId}).sort({date: -1}).limit(5);
    const lastExpenseTransactions = await Expense.find({userId}).sort({date: -1}).limit(5);

    const lastTransactions = [
    ...lastIncomeTransactions.map(item => ({...item.toObject(), type: "income"})),
    ...lastExpenseTransactions.map(item => ({...item.toObject(), type: "expense"}))
    ].sort((a, b) => b.date - a.date);

    // Final response
    res.status(200).json({
    totalBalance: (totalIncome[0]?.total || 0) - (totalExpenses[0]?.total || 0),
    totalIncome: totalIncome[0]?.total || 0,
    totalExpenses: totalExpenses[0]?.total || 0,
    incomeLast60Days: {
        total: incomeLast60Days,
        transactions: last60DaysIncomeTransactions
    },
    expenseLast30Days: {
        total: expenseLast30Days,
        transactions: lat30DaysExpenseTranstactions
    },
    recentTransactions: lastTransactions
    });
});