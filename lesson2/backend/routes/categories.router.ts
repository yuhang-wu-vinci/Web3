import express from "express";
import { CategoriesService } from "../services/categories.service.ts";

const categoriesRouter = express.Router();

// GET /api/categories (ou /categories selon votre index)
categoriesRouter.get("/categories", async (_req, res) => {
  try {
    const categories = await CategoriesService.getAllCategories();
    return res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return res.status(500).json({ error: message });
  }
});

export default categoriesRouter;