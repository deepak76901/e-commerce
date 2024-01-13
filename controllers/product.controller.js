import { Product } from "../models/Product.model.js";

export const createProduct = async (req, res) => {
  // we get product details from API
  const product = new Product(req.body);

  try {
    const doc = await product.save();
    res.status(201).json(doc);
  } catch (error) {
    res.status(401).json(error);
  }
};

export const fetchAllProducts = async (req, res) => {
  // filter = {"category" : {"smartphone","laptop"}}
  // sort = {_sort:"price",_order:"desc"}
  // pagination = {_page=1,_limit=10}

  let query = Product.find({});
  let totalProductsQuery = Product.find({});

  if (req.query.category) {
    query = query.find({ category: req.query.category });
    totalProductsQuery = totalProductsQuery.find({
      category: req.query.category,
    });
  }
  if (req.query.brand) {
    query = query.find({ brand: req.query.brand });
    totalProductsQuery = totalProductsQuery.find({ brand: req.query.brand });
  }
  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
    totalProductsQuery = totalProductsQuery.sort({
      [req.query._sort]: req.query._order,
    });
  }
  if (req.query._page && req.query._limit) {
    const pageSize = req.query._limit;
    const page = req.query.page;
    query = query.skip(pageSize * (page - 1)).limit(pageSize);
    totalProductsQuery = totalProductsQuery
      .skip(pageSize * (page - 1))
      .limit(pageSize);
  }

  const totalDocs = await totalProductsQuery.count().exec();
  console.log({ totalDocs });

  try {
    const docs = await query.exec();
    res.set("X-Total-Count", totalDocs);
    res.status(200).json(docs);
  } catch (error) {
    res.status(402).json(error);
  }
};

export const fetchProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(412).json(error);
  }
};

export const updateProduct = async (req,res) => {
    const {id} = req.params;

    try {
      const product = await Product.findByIdAndUpdate(id,req.body,{new:true})
      res.status(200).json(product)
    } catch (error) {
      res.status(412).json(error);
    }
}
