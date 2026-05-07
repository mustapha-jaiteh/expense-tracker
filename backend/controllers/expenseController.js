import Expense from "../models/Expense.js";
import User from "../models/User.js";
import XLSX from "xlsx";


// add expense sourse
export const addExpense  = async (req, res) => { 
    const userId = req.user.id;
    try {
        const {icon, category, amount, date } = req.body;
        if (!category || !amount || !date ) {
            return res.status(400).json({ message: "Please fill all the fields" });
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
    } catch (error) {
        res.status(500).json({ message: "Error adding expense", error: error.message });
    }
}

// get all expenses
export const getAllExpenses = async (req, res) => {
    const userId = req.user.id;
    try {
        const expenses = await Expense.find({ userId }).sort({date: -1});
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: "Error getting expenses", error: error.message });
    }

}

// update expense
export const updateExpense = async (req, res) => {
    
}

// delete expense
export const deleteExpense = async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Expense removed from database successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error removing expense", error: error.message });
    }

} 
 
// download expense excel
export const downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;
    try {
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
    } catch (error) {
        res.status(500).json({ message: "Error getting expenses", error: error.message });
    }

}
