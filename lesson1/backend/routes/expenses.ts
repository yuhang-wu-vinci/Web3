import { Router, type Request, type Response } from 'express';
import { getAllExpenses, addExpense } from '../services/expenses.ts';
import type { Expense } from '../types/Expense.ts';

const router = Router();

// GET /api/expenses
router.get('/expenses', (_req: Request, res: Response) => {
  try {
    const expenses = getAllExpenses();
    return res.status(200).json(expenses);
  } catch (error) {
    console.error('Erreur lors de la récupération des dépenses:', error);
    const message = error instanceof Error ? error.message : 'Erreur interne du serveur';
    return res.status(500).json({ error: message });
  }
});

// POST /api/expenses
router.post('/expenses', (req: Request, res: Response) => {
  try {
    const body = req.body as Expense;

    if (!body || !body.description || !body.payer || body.amount === undefined) {
      return res.status(400).json({ error: 'Champs obligatoires manquants.' });
    }

    const createdExpense = addExpense(body);
    return res.status(201).json(createdExpense);
  } catch (error) {
    console.error("Erreur lors de l'ajout de la dépense:", error);
    const message = error instanceof Error ? error.message : 'Erreur interne du serveur';
    return res.status(500).json({ error: message });
  }
});

export default router;