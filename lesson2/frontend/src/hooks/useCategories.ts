import { useState, useEffect, useCallback } from "react";
import type { Category } from "../types/Category";

const host = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${host}/api/categories`);
      if (!response.ok) {
        throw new Error(`Erreur serveur (${response.status})`);
      }

      const data: Category[] = await response.json();
      setCategories(data);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Impossible de charger les catégories";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    loading,
    error,
    refetchCategories: fetchCategories,
  };
};