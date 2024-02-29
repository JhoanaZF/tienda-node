import express from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/productController.js";
export const productRoutes = express.Router();

productRoutes.post("/create", createProduct);
productRoutes.delete("/delete/:id", deleteProduct);
productRoutes.put("/update/:id", updateProduct);

productRoutes.get("/", getProducts);
productRoutes.get("/:id", getProductById);
