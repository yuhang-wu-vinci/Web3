import type { Expense } from "../types/Expense";

interface ExpenseItemProps {
  expense: Expense;
}

function ExpenseItem({ expense }: ExpenseItemProps) {
  return (
    <div style={{ borderBottom: "1px solid #ccc", padding: "0.5rem 0" }}>
      <h3>Expense {expense.id}</h3>
      <p>Date: {expense.date}</p>
      <p>Description: {expense.description}</p>
      <p>Amount: {expense.amount.toFixed(2)}</p>
      <p>Payer: {expense.payer}</p>
      {expense.category ? (
        <p>
          Category:{" "}
          <span
            style={{
              backgroundColor: expense.category.colour,
              color: "#fff",
              padding: "2px 8px",
              borderRadius: "4px",
              fontWeight: "bold",
            }}
          >
            {expense.category.name}
          </span>
        </p>
      ) : (
        <p>Category: <em>None</em></p>
      )}
    </div>
  );
}

export default ExpenseItem;