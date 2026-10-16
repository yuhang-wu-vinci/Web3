import { db } from "../src/prisma/db.ts";
import type { Expense } from "../types/expense.ts";

export class ExpensesService {
  /**
   * Récupère toutes les dépenses enregistrées
   */
  static async getAllExpenses() {
  const expenses = await db.orm.public.Expense.all();
  return expenses.sort((a, b) => a.id - b.id);
}

  /**
   * Ajoute une nouvelle dépense
   */
  static async addExpense(expenseData: Omit<Expense, "id">) {
    return await db.orm.public.Expense.create({
      description: expenseData.description,
      payer: expenseData.payer,
      amount: Number(expenseData.amount),
      ...(expenseData.date ? { date: expenseData.date } : {}),
    });
  }

  /**
   * Réinitialise les données
   */
  static async resetExpenses() {
  // Supprime toutes les entrées existantes
  await db.orm.public.Expense.where(({ id }) => id.gte(0)).deleteAll();

  // Réinsère les données de base
  await db.orm.public.Expense.createAll([
    {
      description: "Pizza night",
      payer: "Alice",
      amount: 25.5,
    },
    {
      description: "Train ticket",
      payer: "Bob",
      amount: 42.0,
    },
  ]);

  return await db.orm.public.Expense.all();
}
}