import { useNavigate } from 'react-router';
import ExpenseAdd from '../../components/ExpenseAdd';
import { useExpenses } from '../../hooks/useExpenses';
import { useCategories } from '../../hooks/useCategories';
import type { NewExpense } from '../../types/Expense';

function ExpenseNew() {
  const navigate = useNavigate();
  const { addExpense } = useExpenses();
  const { categories } = useCategories();

  const handleCreate = async (expense: NewExpense) => {
    await addExpense(expense);
    navigate('/expenses');
  };

  return (
    <div>
      <h1>Add a new expense</h1>
      <ExpenseAdd categories={categories} addExpense={handleCreate} />
    </div>
  );
}

export default ExpenseNew;