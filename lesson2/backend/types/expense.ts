export interface Expense {
  id: number;
  date?: string;
  description: string;
  payer: string;
  amount: number;
}

// Représente une dépense à créer (sans son id généré par la DB)
export type NewExpense = Omit<Expense, "id">;