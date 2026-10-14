import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Expense } from '../types/Expense.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataFilePath = path.join(__dirname, '../data/expenses.json');
const initDataFilePath = path.join(__dirname, '../data/expenses.init.json');

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

export const resetExpenses = (): Expense[] => {
  // 1. Lire le fichier initial
  const initData = fs.readFileSync(initDataFilePath, 'utf-8');
  // 2. Écraser le fichier actif
  fs.writeFileSync(dataFilePath, initData, 'utf-8');
  // 3. Renvoyer les données parsées pour confirmation
  return JSON.parse(initData) as Expense[];
};