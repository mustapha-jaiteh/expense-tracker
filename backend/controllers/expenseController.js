import Expense from "../models/Expense.js";
import XLSX from "xlsx";
import { catchAsync } from "../utils/catchAsync.js";
import { ApiError } from "../utils/ApiError.js";

// add expense source
export const addExpense = catchAsync(async (req, res) => { 
    const userId = req.user.id;
    const {icon, category, amount, date } = req.body;
    if (!category || !amount || !date ) {
        throw new ApiError(400, "Please fill all the fields");
    }
    const newExpense = new Expense({
        userId,
        icon,
        category, 
        amount,
        date: new Date(date)
    });
    await newExpense.save();
    res.status(201).json(newExpense);
});

// get all expenses
export const getAllExpenses = catchAsync(async (req, res) => {
    const userId = req.user.id;
    const expenses = await Expense.find({ userId }).sort({date: -1});
    res.status(200).json(expenses);
});

// update expense
export const updateExpense = catchAsync(async (req, res) => {
    const {id} = req.params;
    const {icon, category, amount, date } = req.body;
    if (!category || !amount || !date ) {
        throw new ApiError(400, "Please fill all the fields");
    }
    const updatedExpense = await Expense.findByIdAndUpdate(id, {icon, category, amount, date}, {new: true});
    if (!updatedExpense) {
        throw new ApiError(404, "Expense not found");
    }
    res.status(200).json(updatedExpense);
});

// delete expense
export const deleteExpense = catchAsync(async (req, res) => {
    const deletedExpense = await Expense.findByIdAndDelete(req.params.id);
    if (!deletedExpense) {
        throw new ApiError(404, "Expense not found");
    }
    res.status(200).json({ message: "Expense removed from database successfully" });
}); 
 
// download expense excel
export const downloadExpenseExcel = catchAsync(async (req, res) => {
    const userId = req.user.id;
    const expenses = await Expense.find({ userId }).sort({date: -1});

    //prepare data for excel
    const excelData = expenses.map(item => ({
        "Category": item.category,
        "Amount": item.amount, 
        "Date": item.date.toISOString().split("T")[0]
    })); 

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(excelData); 
    XLSX.utils.book_append_sheet(workbook, worksheet, "Expense");
    XLSX.writeFile(workbook, "expense_details.xlsx");
    res.download("expense_details.xlsx");   
});
