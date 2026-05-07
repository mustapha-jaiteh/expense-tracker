import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { addExpense, getAllExpenses, updateExpense, deleteExpense, downloadExpenseExcel } from "../controllers/expenseController.js";

const router = express.Router();

router.post("/add", protect, addExpense);  
router.get("/get", protect, getAllExpenses);
router.put("/:id", protect, updateExpense);
router.delete("/:id", protect, deleteExpense);
router.get("/downloadexcel", protect, downloadExpenseExcel);

export default router;
