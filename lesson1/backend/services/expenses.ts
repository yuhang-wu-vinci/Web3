import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Expense } from '../types/Expense.ts';

// Recréation équivalente de __dirname compatible NodeNext/ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataFilePath = path.join(__dirname, '../data/expenses.json');

export const getAllExpenses = (): Expense[] => {
  const fileData = fs.readFileSync(dataFilePath, 'utf-8');
  return JSON.parse(fileData) as Expense[];
};

export const addExpense = (newExpense: Expense): Expense => {
  const expenses = getAllExpenses();
  expenses.push(newExpense);
  fs.writeFileSync(dataFilePath, JSON.stringify(expenses, null, 2), 'utf-8');
  return newExpense;
};