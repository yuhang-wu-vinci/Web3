import { useState, useEffect, useCallback } from "react";
import type { Expense } from "../types/Expense";

const host = import.meta.env.VITE_API_URL || "http://unknown-api-url.com";

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExpenses = useCallback(async (amount?: number) => {
    try {
      setLoading(true);
      setError(null);

      const url = new URL(`${host}/api/expenses`);
      if (amount !== undefined) {
        url.searchParams.append("amount", amount.toString());
      }

      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error(`Erreur serveur (${response.status})`);
      }

      const data: Expense[] = await response.json();
      setExpenses(data);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Impossible de charger les dépenses";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const addExpense = async (newExpense: Expense) => {
    try {
      setError(null);
      const response = await fetch(`${host}/api/expenses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newExpense),
      });

      if (!response.ok) {
        throw new Error(`Erreur lors de l'ajout (${response.status})`);
      }

      await fetchExpenses();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Échec de l'enregistrement";
      setError(msg);
    }
  };

  const resetExpenses = async () => {
    try {
      setError(null);
      const response = await fetch(`${host}/api/expenses/reset`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error(`Erreur de réinitialisation (${response.status})`);
      }

      await fetchExpenses();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Échec de la réinitialisation";
      setError(msg);
    }
  };

  return {
    expenses,
    loading,
    error,
    fetchExpenses,
    addExpense,
    resetExpenses,
  };
};