import type { Expense } from "../types/Expense";
import ExpenseItem from "../components/ExpenseItem";
import { useState } from "react";
import ExpenseAdd from "../components/ExpenseAdd";
import { useExpenses } from "../hooks/useExpenses";
import ExpenseReset from "../components/ExpenseReset";
import ExpenseSorter from "../components/ExpenseSorter";
import ExpenseSearch from "../components/ExpenseSearch";

function Home() {
  const { expenses, addExpense, resetExpenses, fetchExpenses, loading, error } = useExpenses();
  const [sortingAlgo, setSortingAlgo] = useState<(a: Expense, b: Expense) => number>(() => () => 1);

  const handleAlgoChange = (algo: (a: Expense, b: Expense) => number) => {
    setSortingAlgo(() => algo);
  };

  const handleSearch = (amount?: number) => {
    fetchExpenses(amount);
  };

  const sortedExpenses = [...expenses].sort(sortingAlgo);

  return (
    <div>
      <h1>Manage your expenses</h1>
      <ExpenseAdd addExpense={addExpense} />
      <ExpenseReset resetExpenses={resetExpenses} />

      <h2>Search</h2>
      <ExpenseSearch onSearch={handleSearch} />

      <h2>Your expenses</h2>
      {loading && <p>Loading expenses...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {sortedExpenses.length > 0 && <ExpenseSorter setSortingAlgo={handleAlgoChange} />}
      <ul>
        {sortedExpenses.map((expense) => (
          <li key={expense.id}>
            <ExpenseItem expense={expense} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;