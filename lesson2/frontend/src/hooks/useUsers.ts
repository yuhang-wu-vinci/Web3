import { useState, useEffect, useCallback } from "react";
import type { User } from "../types/User";

const host = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${host}/api/users`);
      if (!response.ok) {
        throw new Error(`Erreur serveur (${response.status})`);
      }

      const data: User[] = await response.json();
      setUsers(data);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Impossible de charger les utilisateurs";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    loading,
    error,
    refetchUsers: fetchUsers,
  };
};