import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Expense } from "../types/Expense";

interface ExpenseAddProps {
  addExpense: (expense: Expense) => void;
}

// 1. Définition du schéma de validation avec Zod (version simplifiée et compatible)
const expenseSchema = z.object({
  payer: z.enum(["Alice", "Bob"]),
  date: z.string().min(1, "La date est obligatoire"),
  description: z
    .string()
    .max(200, "La description ne peut pas dépasser 200 caractères")
    .optional(),
  amount: z
    .number()
    .positive("Le montant doit être un nombre positif"),
});

// Inférer le type TypeScript automatiquement à partir du schéma Zod
type ExpenseFormData = z.infer<typeof expenseSchema>;

function ExpenseAdd({ addExpense }: ExpenseAddProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      payer: "Alice",
      date: new Date().toISOString().split("T")[0],
      description: "",
      amount: 0,
    },
  });

  const onSubmit = (data: ExpenseFormData) => {
    const newExpense = {
      id: 0,
      payer: data.payer,
      date: data.date,
      description: data.description || "",
      amount: data.amount,
    };

    addExpense(newExpense as Expense);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: "20px" }}>
      <h2>Add a new Expense (Zod Validation)</h2>

      <div>
        <label>Payer: </label>
        <select {...register("payer")}>
          <option value="Alice">Alice</option>
          <option value="Bob">Bob</option>
        </select>
        {errors.payer && <p style={{ color: "red" }}>{errors.payer.message}</p>}
      </div>

      <div>
        <label>Date: </label>
        <input type="date" {...register("date")} />
        {errors.date && <p style={{ color: "red" }}>{errors.date.message}</p>}
      </div>

      <div>
        <label>Description: </label>
        <input
          type="text"
          placeholder="Ex: Restaurant"
          {...register("description")}
        />
        {errors.description && (
          <p style={{ color: "red" }}>{errors.description.message}</p>
        )}
      </div>

      <div>
        <label>Amount: </label>
        <input
          type="number"
          step="0.01"
          placeholder="0.00"
          {...register("amount", { valueAsNumber: true })}
        />
        {errors.amount && <p style={{ color: "red" }}>{errors.amount.message}</p>}
      </div>

      <button type="submit" style={{ marginTop: "10px" }}>
        Add Expense
      </button>
    </form>
  );
}

export default ExpenseAdd;