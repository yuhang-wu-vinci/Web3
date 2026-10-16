import { useForm } from "react-hook-form";
import type { Expense } from "../types/Expense";

interface ExpenseAddProps {
  addExpense: (expense: Expense) => void;
}

interface ExpenseFormData {
  payer: string;
  date: string;
  description: string;
  amount: number;
}

function ExpenseAdd({ addExpense }: ExpenseAddProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpenseFormData>({
    defaultValues: {
      payer: "Alice",
      date: new Date().toISOString().split("T")[0],
      description: "",
      amount: 0,
    },
  });

  const onSubmit = (data: ExpenseFormData) => {
    // On formate les données avant de les envoyer au backend
    const newExpense = {
      id: 0,
      payer: data.payer,
      date: data.date,
      description: data.description,
      amount: Number(data.amount),
    };

    addExpense(newExpense as Expense);
    reset(); // Réinitialise le formulaire après soumission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: "20px" }}>
      <h2>Add a new Expense (React Hook Form)</h2>

      <div>
        <label>Payer: </label>
        <select {...register("payer", { required: true })}>
          <option value="Alice">Alice</option>
          <option value="Bob">Bob</option>
        </select>
      </div>

      <div>
        <label>Date: </label>
        <input type="date" {...register("date", { required: true })} />
      </div>

      <div>
        <label>Description: </label>
        <input
          type="text"
          placeholder="Ex: Restaurant"
          {...register("description")}
        />
      </div>

      <div>
        <label>Amount: </label>
        <input
          type="number"
          step="0.01"
          placeholder="0.00"
          {...register("amount", { required: true, valueAsNumber: true })}
        />
        {errors.amount && <span style={{ color: "red" }}> Amount field is required</span>}
      </div>

      <button type="submit" style={{ marginTop: "10px" }}>Add Expense</button>
    </form>
  );
}

export default ExpenseAdd;