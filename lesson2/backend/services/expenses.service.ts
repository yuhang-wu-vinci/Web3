import { db } from "../src/prisma/db.ts";

export class ExpensesService {
  static async getAllExpenses() {
    const expenses = await db.orm.public.Expense.all();
    return expenses.sort((a, b) => a.id - b.id);
  }

  static async addExpense(expenseData: any) {
    let payerId: number;

    if (expenseData.payerId !== undefined) {
      payerId = Number(expenseData.payerId);
    } else if (expenseData.payer) {
      // Recherche de l'utilisateur par nom
      const users = await db.orm.public.User.where(({ name }) =>
        name.equals(String(expenseData.payer))
      ).all();

      if (users.length > 0) {
        payerId = users[0].id;
      } else {
        // Crée l'utilisateur s'il n'existe pas encore
        const newUser = await db.orm.public.User.create({
          name: String(expenseData.payer),
          email: `${String(expenseData.payer).toLowerCase()}@example.com`,
        });
        payerId = newUser.id;
      }
    } else {
      throw new Error("Missing payer or payerId");
    }

    return await db.orm.public.Expense.create({
      description: String(expenseData.description),
      amount: Number(expenseData.amount),
      payerId: payerId,
      ...(expenseData.date ? { date: String(expenseData.date) } : {}),
    });
  }

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

    return await db.orm.public.Expense.all();
  }
}