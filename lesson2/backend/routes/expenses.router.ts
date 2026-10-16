import express from "express";
import { ExpensesService } from "../services/expenses.service.ts";
import { isValidNewExpense } from "../guards/expenses.guard.ts";

const expensesRouter = express.Router();

// GET /api/expenses
expensesRouter.get("/expenses", async (_req, res) => {
  try {
    const expenses = await ExpensesService.getAllExpenses();
    return res.status(200).json(expenses);
  } catch (error) {
    console.error("Error fetching expenses:", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return res.status(500).json({ error: message });
  }
});


// POST /api/expenses/reset
expensesRouter.post("/expenses/reset", async (_req, res) => {
  try {
    const resetData = await ExpensesService.resetExpenses();
    return res.status(200).json({
      message: "Data reset successfully",
      expenses: resetData,
    });
  } catch (error) {
    console.error("Error resetting expenses:", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return res.status(500).json({ error: message });
  }
});

export default expensesRouter;