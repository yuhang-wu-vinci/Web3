import { db } from "../src/prisma/db.ts";
import type { Expense } from "../types/expense.ts";

export class ExpensesService {
  /**
   * Récupère toutes les dépenses enregistrées avec leur payeur
   */
  static async getAllExpenses() {
    const expenses = await db.orm.public.Expense.all();
    return expenses.sort((a, b) => a.id - b.id);
  }

  /**
   * Ajoute une nouvelle dépense
   */
  static async addExpense(expenseData: { description: string; amount: number; payerId: number; date?: string }) {
    return await db.orm.public.Expense.create({
      description: expenseData.description,
      amount: Number(expenseData.amount),
      payerId: Number(expenseData.payerId),
      ...(expenseData.date ? { date: expenseData.date } : {}),
    });
  }

  /**
   * Réinitialise les données
   */
  static async resetExpenses() {
    // Supprime toutes les entrées existantes
    await db.orm.public.Expense.where(({ id }) => id.gte(0)).deleteAll();
    await db.orm.public.User.where(({ id }) => id.gte(0)).deleteAll();

    // Recrée un utilisateur par défaut pour le reset
    const alice = await db.orm.public.User.create({
      name: "Alice",
      email: "alice@reset.com",
    });

    const bob = await db.orm.public.User.create({
      name: "Bob",
      email: "bob@reset.com",
    });

    // Réinsère les données de base
    await db.orm.public.Expense.createAll([
      {
        description: "Pizza night",
        amount: 25.5,
        payerId: alice.id,
      },
      {
        description: "Train ticket",
        amount: 42.0,
        payerId: bob.id,
      },
    ]);

    return await db.orm.public.Expense.all();
  }
}