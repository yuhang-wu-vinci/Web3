import { db } from "../src/prisma/db.ts";
import type { User } from "../types/user.ts";

export class UsersService {
  /**
   * Récupère la liste de tous les utilisateurs
   */
  static async getAllUsers(): Promise<User[]> {
    const users = await db.orm.public.User.all();

    return users
      .map((u) => ({
        id: u.id,
        name: u.name,
        email: u.email,
      }))
      .sort((a, b) => a.id - b.id);
  }
}