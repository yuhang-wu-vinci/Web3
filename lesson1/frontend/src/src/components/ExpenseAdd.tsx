import type { Expense } from "../../types/Expense";

interface ExpenseAddProps{
    addExpense: (expense: Expense)=> void;
}

export const ExpenseAdd=({addExpense} :ExpenseAddProps)=>{
    const handleClick =()=>{
        const id = Date.now().toString();
        const payers = ['Alice','Bob'];
        const randomPayer = payers[Math.floor(Math.random() * payers.length)];
        const randomAmount = parseFloat((Math.random() * 100).toFixed(2));

        const newExpense: Expense = {
            id : id,
            date: new Date().toString(),
            description: "expense :" + id,
            payer: randomPayer,
            amount: randomAmount,
        };
        addExpense(newExpense);

    };
    return(
        <button type="button" onClick={handleClick} >
            Add
        </button>
    )



}