import Income from "../models/Income.js";
import User from "../models/User.js";
import XLSX from "xlsx";


// add income sourse
export const addIncome = async (req, res) => { 
    const userId = req.user.id;
    try {
        const {icon, source, amount, date } = req.body;
        if (!source || !amount || !date ) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }
        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date)
        });
        await newIncome.save();
        res.status(201).json(newIncome);
    } catch (error) {
        res.status(500).json({ message: "Error adding income", error: error.message });
    }
}

// get all incomes
export const getAllIncomes = async (req, res) => {
    const userId = req.user.id;
    try {
        const incomes = await Income.find({ userId }).sort({date: -1});
        res.status(200).json(incomes);
    } catch (error) {
        res.status(500).json({ message: "Error getting incomes", error: error.message });
    }

}

// update income
export const updateIncome = async (req, res) => {
    try {
        const {id} = req.params;
        const {icon, source, amount, date } = req.body;
        if (!source || !amount || !date ) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }
        const updatedIncome = await Income.findByIdAndUpdate(id, {icon, source, amount, date}, {new: true});
        res.status(200).json(updatedIncome);
    } catch (error) {
        res.status(500).json({ message: "Error updating income", error: error.message });
    }
    
}

// delete income
export const deleteIncome = async (req, res) => {
    try {
        await Income.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Income removed from database successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error removing income", error: error.message });
    }

} 

// download income excel
export const downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;
    try {
        const income = await Income.find({ userId }).sort({date: -1});

        //prepare data for excel
        const excelData = income.map(item => ({
            "Source": item.source,
            "Amount": item.amount, 
            "Date": item.date.toISOString().split("T")[0]
        })); 
  
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(excelData); 
        XLSX.utils.book_append_sheet(workbook, worksheet, "Income");
        XLSX.writeFile(workbook, "income_details.xlsx");
        res.download("income_details.xlsx");   
    } catch (error) {
        res.status(500).json({ message: "Error getting incomes", error: error.message });
    }

}
