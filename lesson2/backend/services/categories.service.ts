import { db } from "../src/prisma/db.ts";
import type { Category } from "../types/category.ts";

export class CategoriesService {
  /**
   * Récupère la liste de toutes les catégories
   */
  static async getAllCategories(): Promise<Category[]> {
    const categories = await db.orm.public.Category.all();

    return categories
      .map((c) => ({
        id: c.id,
        name: c.name,
        colour: c.colour,
      }))
      .sort((a, b) => a.id - b.id);
  }
}