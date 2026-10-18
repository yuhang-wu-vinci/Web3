import { useState, type FormEvent } from "react";

interface ExpenseSearchProps {
  onSearch: (amount?: number) => void;
}

function ExpenseSearch({ onSearch }: ExpenseSearchProps) {
  const [amount, setAmount] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (amount.trim() === "") {
      onSearch(undefined);
    } else {
      const parsed = parseFloat(amount);
      if (!isNaN(parsed) && parsed >= 0) {
        onSearch(parsed);
      }
    }
  };

  const handleReset = () => {
    setAmount("");
    onSearch(undefined);
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: "1rem 0" }}>
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
      <button type="submit" style={{ marginLeft: "0.5rem" }}>
        Search
      </button>
      <button type="button" onClick={handleReset} style={{ marginLeft: "0.5rem" }}>
        Clear
      </button>
    </form>
  );
}

export default ExpenseSearch;