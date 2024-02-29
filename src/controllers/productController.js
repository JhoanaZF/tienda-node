import { json } from "express";
import { Product } from "../models/Product.js";
import { responseData } from "../helpers/response.js";
import { Category } from "../models/Category.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .select("-__v")
      .populate("category", "name");
    res.json(responseData(true, "exito", products));
  } catch (error) {
    console.log(error);
    return res.status(500).json(responseData(false, error.message, {}));
  }
};

export const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id).populate("category", "name");
    res.json(responseData(true, "exito", product));
  } catch (error) {
    console.log(error);
    return res.status(500).json(responseData(false, error.message, {}));
  }
};

export const createProduct = async (req, res) => {
  try {
    if (
      !req.body.name ||
      !req.body.description ||
      !req.body.price ||
      !req.body.stock ||
      !req.body.category
    )
      return res
        .status(500)
        .json(responseData(false, "solo status no es obligatorio", {}));

    const category = await Category.findById(req.body.category);

    if (!category)
      return res.json(responseData(false, "la categoria no existe", {}));

    const product = new Product(req.body);
    await product.save();

    category.products.push(product._id);

    await category.save();
    res.json(responseData(true, "exito", product));
  } catch (error) {
    console.log(error);
    return res.status(500).json(responseData(false, error.message, {}));
  }
};

export const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);

    if (!product)
      return res
        .status(404)
        .json(responseData(false, "el producto no existe", {}));

    product.name = req.body.name ?? product.name;
    product.description = req.body.description ?? product.description;
    product.status = req.body.status ?? product.status;
    product.price = req.body.price ?? product.price;
    product.stock = req.body.stock ?? product.stock;
    product.category = req.body.category ?? product.category;

    await product.save();

    res.json(responseData(true, "exito", product));
  } catch (error) {
    console.log(error);
    return res.status(500).json(responseData(false, error.message, {}));
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);

    if (!product)
      return res
        .status(404)
        .json(responseData(false, "el producto no existe", {}));

    await product.deleteOne();

    res.json(responseData(true, "exito", product));
  } catch (error) {
    console.log(error);
    return res.status(500).json(responseData(false, error.message, {}));
  }
};
