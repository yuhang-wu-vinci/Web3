import { useState, type FormEvent } from "react";
import type { User } from "../types/User";
import type { SearchFilters } from "../hooks/useExpenses";

interface ExpenseSearchProps {
  users: User[];
  onSearch: (filters: SearchFilters) => void;
}

function ExpenseSearch({ users, onSearch }: ExpenseSearchProps) {
  const [amount, setAmount] = useState<string>("");
  const [payerId, setPayerId] = useState<string>("");

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

    onSearch(filters);
  };

  const handleReset = () => {
    setAmount("");
    setPayerId("");
    onSearch({});
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: "1rem 0", display: "flex", gap: "0.8rem", alignItems: "center" }}>
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
              {user.name} (id: {user.id})
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