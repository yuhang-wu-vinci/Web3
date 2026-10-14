import express from "express";
import type { Expense } from "../types/expense.ts";
import { ExpensesService } from "../services/expenses.service.ts";
import { isValidNewExpense } from "../guards/expenses.guard.ts";

const expensesRouter = express.Router();

// GET /api/expenses
expensesRouter.get("/expenses", (_req, res) => {
  try {
    const expenses = ExpensesService.getExpenses();
    return res.status(200).json(expenses);
  } catch (error) {
    console.error("Error fetching expenses:", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return res.status(500).json({ error: message });
  }
});

// POST /api/expenses
expensesRouter.post("/expenses", (req, res) => {
  try {
    const expense: Expense = req.body;
    if (!isValidNewExpense(expense)) {
      return res.status(400).json({ error: "Invalid expense" });
    }
    const createdExpense = ExpensesService.addExpense(expense);
    return res.status(201).json(createdExpense);
  } catch (error) {
    console.error("Error adding expense:", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return res.status(500).json({ error: message });
  }
});

// POST /api/expenses/reset
expensesRouter.post("/expenses/reset", (_req, res) => {
  try {
    const resetData = ExpensesService.resetExpenses();
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