import type { Expense } from "../types/expense.ts";

export function isValidNewExpense(data: any): boolean {
  if (typeof data !== 'object' || data === null) {
    return false;
  }
  const candidate = data as Record<string, unknown>;
  return (
    typeof candidate.description === 'string' &&
    (typeof candidate.payerId === 'number' || typeof candidate.payerId === 'string') &&
    typeof candidate.amount === 'number'
  );
}