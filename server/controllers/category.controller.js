import { Category } from "../models/category.model.js";

export const fetchCategory = async (req, res, next) => {
  try {
    const category = await Category.find({}).exec();
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (req, res, next) => {
  const category = new Category(req.body);
  try {
    const doc = await category.save();
    res.status(201).json(doc);
  } catch (error) {
    next(error);
  }
};
