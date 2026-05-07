import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { addIncome, getAllIncomes, updateIncome, deleteIncome, downloadIncomeExcel } from "../controllers/incomeController.js";

const router = express.Router();

router.post("/add", protect, addIncome);  
router.get("/get", protect, getAllIncomes);
router.put("/:id", protect, updateIncome);
router.delete("/:id", protect, deleteIncome);
router.get("/downloadexcel", protect, downloadIncomeExcel);

export default router;
