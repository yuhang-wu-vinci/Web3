import { useState, type FormEvent } from "react";
import type { NewExpense } from "../types/Expense";
import type { Category } from "../types/Category";

interface ExpenseAddProps {
  categories: Category[];
  addExpense: (expense: NewExpense) => Promise<void>;
}

function ExpenseAdd({ categories, addExpense }: ExpenseAddProps) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [payer, setPayer] = useState("");
  const [categoryId, setCategoryId] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!description || !amount || !payer) return;

    await addExpense({
      description,
      amount: parseFloat(amount),
      payer,
      categoryId: categoryId ? parseInt(categoryId, 10) : null,
    });

    setDescription("");
    setAmount("");
    setPayer("");
    setCategoryId("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: "1rem 0", display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        step="0.01"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Payer name"
        value={payer}
        onChange={(e) => setPayer(e.target.value)}
        required
      />
      <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
        <option value="">No category</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
      <button type="submit">Add expense</button>
    </form>
  );
}

export default ExpenseAdd;