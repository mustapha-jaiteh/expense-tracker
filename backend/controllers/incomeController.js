import Income from "../models/Income.js";
import XLSX from "xlsx";
import { catchAsync } from "../utils/catchAsync.js";
import { ApiError } from "../utils/ApiError.js";

// add income source
export const addIncome = catchAsync(async (req, res) => { 
    const userId = req.user.id;
    const {icon, source, amount, date } = req.body;
    if (!source || !amount || !date ) {
        throw new ApiError(400, "Please fill all the fields");
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
});

// get all incomes
export const getAllIncomes = catchAsync(async (req, res) => {
    const userId = req.user.id;
    const incomes = await Income.find({ userId }).sort({date: -1});
    res.status(200).json(incomes);
});

// update income
export const updateIncome = catchAsync(async (req, res) => {
    const {id} = req.params;
    const {icon, source, amount, date } = req.body;
    if (!source || !amount || !date ) {
        throw new ApiError(400, "Please fill all the fields");
    }
    const updatedIncome = await Income.findByIdAndUpdate(id, {icon, source, amount, date}, {new: true});
    if (!updatedIncome) {
        throw new ApiError(404, "Income not found");
    }
    res.status(200).json(updatedIncome);
});

// delete income
export const deleteIncome = catchAsync(async (req, res) => {
    const deletedIncome = await Income.findByIdAndDelete(req.params.id);
    if (!deletedIncome) {
        throw new ApiError(404, "Income not found");
    }
    res.status(200).json({ message: "Income removed from database successfully" });
}); 

// download income excel
export const downloadIncomeExcel = catchAsync(async (req, res) => {
    const userId = req.user.id;
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
});
