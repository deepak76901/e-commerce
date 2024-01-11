import { Product } from "../models/Product.model.js";

export const createProduct = async (req, res) => {
  // we get product details from API
  const product = new Product(req.body);

  try {
    const doc = await product.save();
    res.status(201).json(doc)
    
  } catch (error) {
    res.status(401).json(error)
  }
  
};
