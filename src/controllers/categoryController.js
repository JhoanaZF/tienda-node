import { json } from "express";
import { Category } from "../models/Category.js";
import { responseData } from "../helpers/response.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().select("-products -__v");
    res.json(responseData(true, "exito", categories));
  } catch (error) {
    console.log(error);
    return res.status(500).json(responseData(false, error.message, {}));
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findById(id).populate("products");
    res.json(responseData(true, "exito", category));
  } catch (error) {
    console.log(error);
    return res.status(500).json(responseData(false, error.message, {}));
  }
};

export const createCategory = async (req, res) => {
  try {
    if (!req.body.name || !req.body.description)
      return res
        .status(500)
        .json(responseData(false, "name y description son obligatorios", {}));

    const newCategory = new Category(req.body);
    const category = await newCategory.save();

    res.json(responseData(true, "exito", category));
  } catch (error) {
    console.log(error);
    return res.status(500).json(responseData(false, error.message, {}));
  }
};

export const updateCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findById(id);

    if (!category)
      return res
        .status(404)
        .json(responseData(false, "la categoria no existe", {}));

    category.name = req.body.name ?? category.name;
    category.description = req.body.description ?? category.description;
    category.status = req.body.status ?? category.status;

    await category.save();

    res.json(responseData(true, "exito", category));
  } catch (error) {
    console.log(error);
    return res.status(500).json(responseData(false, error.message, {}));
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findById(id);

    if (!category)
      return res
        .status(404)
        .json(responseData(false, "la categoria no existe", {}));

    await category.deleteOne();

    res.json(responseData(true, "exito", category));
  } catch (error) {
    console.log(error);
    return res.status(500).json(responseData(false, error.message, {}));
  }
};
