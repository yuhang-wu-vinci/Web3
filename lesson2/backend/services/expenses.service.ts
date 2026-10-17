import { db } from "../src/prisma/db.ts";

export class ExpensesService {
  /**
   * Récupère toutes les dépenses avec le payeur relié
   */
  static async getAllExpenses() {
    const expenses = await db.orm.public.Expense.include("payer").all();

    return expenses
      .map((e) => ({
        id: e.id,
        description: e.description,
        amount: e.amount,
        date: e.date,
        payerId: e.payerId,
        payer: e.payer ? e.payer.name : "Unknown",
      }))
      .sort((a, b) => a.id - b.id);
  }

  /**
   * Ajoute une dépense en gérant payerId ou le nom du payer
   */
  static async addExpense(expenseData: any) {
    let resolvedPayerId: number;

    if (expenseData.payerId !== undefined) {
      resolvedPayerId = Number(expenseData.payerId);
    } else if (expenseData.payer) {
      const payerName = String(expenseData.payer).trim();

      // Cherche l'utilisateur existant
      const existingUsers = await db.orm.public.User.where(({ name }) =>
  name.eq(payerName)
).all();

      if (existingUsers.length > 0) {
        resolvedPayerId = existingUsers[0].id;
      } else {
        // Crée l'utilisateur avec un email unique s'il n'existe pas encore
        const newUser = await db.orm.public.User.create({
          name: payerName,
          email: `${payerName.toLowerCase()}_${Date.now()}@example.com`,
        });
        resolvedPayerId = newUser.id;
      }
    } else {
      throw new Error("Missing payer or payerId");
    }

    const created = await db.orm.public.Expense.create({
      description: String(expenseData.description),
      amount: Number(expenseData.amount),
      payerId: resolvedPayerId,
      ...(expenseData.date ? { date: String(expenseData.date) } : {}),
    });

// APRÈS (syntaxe Prisma 8 correcte) :
const fullExpense = await db.orm.public.Expense.where(({ id }) =>
  id.eq(created.id)
).include("payer").first();

    return {
      id: created.id,
      description: created.description,
      amount: created.amount,
      date: created.date,
      payerId: created.payerId,
      payer: fullExpense?.payer?.name ?? (expenseData.payer || "Unknown"),
    };
  }

  /**
   * Réinitialise les données
   */
  static async resetExpenses() {
    await db.orm.public.Expense.where(({ id }) => id.gte(0)).deleteAll();
    await db.orm.public.User.where(({ id }) => id.gte(0)).deleteAll();

    const alice = await db.orm.public.User.create({
      name: "Alice",
      email: "alice@reset.com",
    });

    const bob = await db.orm.public.User.create({
      name: "Bob",
      email: "bob@reset.com",
    });

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

    return await this.getAllExpenses();
  }
}