import type { Category } from "./Category";

export interface Expense {
  id: number;
  date?: string;
  description: string;
  payer: string;
  payerId?: number;
  amount: number;
  categoryId?: number | null;
  category?: Category | null;
}

export type NewExpense = Omit<Expense, "id">;