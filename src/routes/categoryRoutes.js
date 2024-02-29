import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/categoryController.js";
export const categoryRoutes = express.Router();

categoryRoutes.post("/create", createCategory);
categoryRoutes.delete("/delete/:id", deleteCategory);
categoryRoutes.put("/update/:id", updateCategory);

categoryRoutes.get("/", getCategories);
categoryRoutes.get("/:id", getCategoryById);
