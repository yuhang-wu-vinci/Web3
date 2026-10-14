import { useState } from 'react';
import { ExpenseItem } from '../src/components/ExpenseItem';
import { ExpenseAdd } from '../src/components/ExpenseAdd';
import { useExpenses } from '../hooks/useExpenses';

export const Home = () => {
  const { expenses, loading, error, addExpense, resetExpenses } = useExpenses();
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleResetClick = async () => {
    await resetExpenses();
    setFeedback('Données réinitialisées avec succès !');
    setTimeout(() => {
      setFeedback(null);
    }, 3000);
  };

  return (
    <div>
      <h1>Liste des dépenses</h1>

      {/* Boutons d'action */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        <ExpenseAdd addExpense={addExpense} />
        <button type="button" onClick={handleResetClick}>
          Reset Data
        </button>
      </div>

      {/* Message de confirmation temporaire */}
      {feedback && <p style={{ color: 'green' }}>{feedback}</p>}

      {/* Gestion des erreurs */}
      {error && <p style={{ color: 'red' }}>⚠️ {error}</p>}

      {/* État de chargement */}
      {loading ? (
        <p>Chargement des dépenses...</p>
      ) : (
        <div className="expense-list">
          {expenses.length === 0 ? (
            <p>Aucune dépense enregistrée.</p>
          ) : (
            expenses.map((expense) => (
              <ExpenseItem key={expense.id} expense={expense} />
            ))
          )}
        </div>
      )}
    </div>
  );
};