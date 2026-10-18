import { z } from "zod";
import { userSchema } from "./user.ts";

export const expenseSchema = z.object({
  id: z.number(),
  date: z.string().optional(),
  description: z.string().max(200),
  payerId: z.number(),
  payer: userSchema.optional(),
  amount: z.number().nonnegative(),
});

export const newExpenseSchema = expenseSchema.omit({ id: true });

const expenseFilterSchema = z.object({
  amount: z.coerce.number().nonnegative().optional(),
  payerId: z.coerce.number().int().positive().optional(),
});

function parseWithSchema<T>(schema: z.ZodType<T>, data: unknown): T | false {
  const result = schema.safeParse(data);
  return result.success ? result.data : false;
}

export type Expense = z.infer<typeof expenseSchema>;
export type NewExpense = z.infer<typeof newExpenseSchema>;
export type ExpenseFilter = z.infer<typeof expenseFilterSchema>;

export function parseExpenseFilter(data: unknown): ExpenseFilter | false {
  return parseWithSchema(expenseFilterSchema, data);
}

export function parseNewExpense(data: unknown): NewExpense | false {
  return parseWithSchema(newExpenseSchema, data);
}

export function expenseFromDBO(dbo: any): Expense {
  return {
    ...dbo,
    id: Number(dbo.id),
    date: dbo.date ? String(dbo.date) : undefined,
  };
}