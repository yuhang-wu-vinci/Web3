import type {Expense} from '../../types/Expense';

interface ExpenseItemProps{
    expense: Expense;
}

export const ExpenseItem =({expense}:ExpenseItemProps )=>{
    const {date, description, payer, amount} = expense;

    return(
        <div className="expense-item">
            <span>{date}</span>
            <span>{description}</span>
            <span>{payer}</span>
            <span>{amount.toFixed(2)}</span>
        </div>
    )

}