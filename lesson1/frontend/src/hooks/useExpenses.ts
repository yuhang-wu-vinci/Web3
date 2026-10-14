import { useState, useEffect } from 'react';
import type { Expense } from '../types/Expense';

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fonction interne de récupération de la liste complète
  const fetchExpenses = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/expenses');
      if (!response.ok) {
        throw new Error(`Erreur serveur (${response.status})`);
      }

      const data: Expense[] = await response.json();
      setExpenses(data);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Impossible de charger les dépenses';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  // Chargement initial au montage du composant
  useEffect(() => {
    fetchExpenses();
  }, []);

  // Fonction pour ajouter une dépense
  const addExpense = async (newExpense: Expense) => {
    try {
      setError(null);
      const response = await fetch('/api/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newExpense),
      });

      if (!response.ok) {
        throw new Error(`Erreur lors de l'ajout (${response.status})`);
      }

      // Rafraîchissement automatique de la liste depuis le backend
      await fetchExpenses();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Échec de l'enregistrement";
      setError(msg);
    }
  };

  // Fonction pour réinitialiser les dépenses
  const resetExpenses = async () => {
    try {
      setError(null);
      const response = await fetch('/api/expenses/reset', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error(`Erreur de réinitialisation (${response.status})`);
      }

      await fetchExpenses();
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Échec de la réinitialisation';
      setError(msg);
    }
  };

  return {
    expenses,
    loading,
    error,
    addExpense,
    resetExpenses,
  };
};