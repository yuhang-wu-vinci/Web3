import express from "express";
import { UsersService } from "../services/users.service.ts";

const usersRouter = express.Router();

// GET /api/users (ou /users selon le préfixe défini dans index/app)
usersRouter.get("/users", async (_req, res) => {
  try {
    const users = await UsersService.getAllUsers();
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return res.status(500).json({ error: message });
  }
});

export default usersRouter;