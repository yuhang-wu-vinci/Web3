import { z } from "zod";

export const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
  colour: z.string(),
});

export const newCategorySchema = categorySchema.omit({ id: true });

export type Category = z.infer<typeof categorySchema>;
export type NewCategory = z.infer<typeof newCategorySchema>;