import { Brand } from "../models/Brand.model.js";

export const fetchBrand = async (req, res, next) => {
  try {
    const brands = await Brand.find({}).exec();
    res.status(200).json(brands);
  } catch (error) {
    next(error);
  }
};

export const createBrand = async (req, res, next) => {
  const brand = new Brand(req.body);
  try {
    const docs = await brand.save();
    res.status(201).json(docs);
  } catch (error) {
    next(error);
  }
};
