import express from "express";
import { ExpensesService } from "../services/expenses.service.ts";
import { isValidNewExpense } from "../guards/expenses.guard.ts";
import { parseExpenseFilter } from "../types/expense.ts";

const expensesRouter = express.Router();

// GET /api/expenses
expensesRouter.get("/expenses", async (req, res) => {
  try {
    const filter = parseExpenseFilter(req.query);
    if (filter === false) {
      return res.status(400).json({ error: "Invalid query parameters" });
    }

    const expenses = await ExpensesService.getAllExpenses(filter);
    return res.status(200).json(expenses);
  } catch (error) {
    console.error("Error fetching expenses:", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return res.status(500).json({ error: message });
  }
});

// POST /api/expenses
expensesRouter.post(["/expenses", "/expenses/add"], async (req, res) => {
  try {
    const expense = req.body;
    if (!isValidNewExpense(expense)) {
      return res.status(400).json({ error: "Invalid expense payload" });
    }
    const createdExpense = await ExpensesService.addExpense(expense);
    return res.status(201).json(createdExpense);
  } catch (error) {
    console.error("Error adding expense:", error);
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