import { useState, type FormEvent } from "react";
import type { User } from "../types/User";
import type { Category } from "../types/Category";
import type { SearchFilters } from "../hooks/useExpenses";

interface ExpenseSearchProps {
  users: User[];
  categories: Category[];
  onSearch: (filters: SearchFilters) => void;
}

function ExpenseSearch({ users, categories, onSearch }: ExpenseSearchProps) {
  const [amount, setAmount] = useState<string>("");
  const [payerId, setPayerId] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const filters: SearchFilters = {};

    if (amount.trim() !== "") {
      const parsedAmount = parseFloat(amount);
      if (!isNaN(parsedAmount) && parsedAmount >= 0) {
        filters.amount = parsedAmount;
      }
    }

    if (payerId.trim() !== "") {
      const parsedPayerId = parseInt(payerId, 10);
      if (!isNaN(parsedPayerId)) {
        filters.payerId = parsedPayerId;
      }
    }

    if (categoryId.trim() !== "") {
      const parsedCategoryId = parseInt(categoryId, 10);
      if (!isNaN(parsedCategoryId)) {
        filters.categoryId = parsedCategoryId;
      }
    }

    onSearch(filters);
  };

  const handleReset = () => {
    setAmount("");
    setPayerId("");
    setCategoryId("");
    onSearch({});
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: "1rem 0", display: "flex", gap: "0.8rem", alignItems: "center", flexWrap: "wrap" }}>
      <div>
        <label htmlFor="min-amount">Minimum amount: </label>
        <input
          id="min-amount"
          type="number"
          step="0.01"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="e.g. 10"
        />
      </div>

      <div>
        <label htmlFor="payer-select">Payer: </label>
        <select
          id="payer-select"
          value={payerId}
          onChange={(e) => setPayerId(e.target.value)}
        >
          <option value="">All users</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="category-select">Category: </label>
        <select
          id="category-select"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <button type="submit">Search</button>
      <button type="button" onClick={handleReset}>Clear</button>
    </form>
  );
}

export default ExpenseSearch;