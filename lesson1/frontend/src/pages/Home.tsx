import { useState } from "react";
import { ExpenseItem } from "../src/components/ExpenseItem";
import type { Expense } from "../types/Expense";
import { ExpenseAdd } from "../src/components/ExpenseAdd";

const mockExpenses: Expense[] = [
  {
    id: '1',
    date: '2026-10-12',
    description: 'Courses supermarché',
    payer: 'Alice',
    amount: 45.2,
  },
  {
    id: '2',
    date: '2026-10-13',
    description: 'Abonnement transport',
    payer: 'Bob',
    amount: 30.0,
  },
  {
    id: '3',
    date: '2026-10-14',
    description: 'Restaurant',
    payer: 'Alice',
    amount: 78.5,
  },
];

export const Home=()=>{

  const [expenses,setExpenses] = useState<Expense[]>(mockExpenses);
  const handleAddExpense =(newExpense : Expense)=>{
    setExpenses([...expenses, newExpense]);
  };




    return(
        <div>
            <h1>"Liste des dépenses"</h1>
            <ExpenseAdd addExpense={handleAddExpense}/>
            <div className="expense-list">
                {expenses.map((expense)=>(<ExpenseItem key={expense.id} expense={expense}/>))}
            </div>
        </div>
    )
}