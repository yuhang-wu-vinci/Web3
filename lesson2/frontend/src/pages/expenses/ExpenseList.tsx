import ExpenseItem from '../../components/ExpenseItem';
import ExpenseSearch from '../../components/ExpenseSearch';
import { useExpenses, type SearchFilters } from '../../hooks/useExpenses';
import { useUsers } from '../../hooks/useUsers';
import { useCategories } from '../../hooks/useCategories';

function ExpenseList() {
  const { expenses, fetchExpenses, loading, error } = useExpenses();
  const { users } = useUsers();
  const { categories } = useCategories();

  const handleSearch = (filters: SearchFilters) => {
    fetchExpenses(filters);
  };

  return (
    <div>
      <h1>Expenses</h1>

      <h2>Search</h2>
      <ExpenseSearch users={users} categories={categories} onSearch={handleSearch} />

      <h2>List</h2>
      {loading && <p>Loading expenses...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            <ExpenseItem expense={expense} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpenseList;