import { Product } from "../models/Product.model.js";

export const createProduct = async (req, res, next) => {
  let product = req.body;
  try {
    const productCount = Product.countDocuments();
    // product = {...product,id:productCount+1}
    const newProduct = new Product(product);

    const doc = await newProduct.save();
    res.status(201).json(doc);
  } catch (error) {
    next(error);
  }
};

export const fetchAllProducts = async (req, res, next) => {
  // filter = {"category" : {"smartphone","laptop"}}
  // sort = {_sort:"price",_order:"desc"}
  // pagination = {_page=1,_limit=10}

  let query = Product.find({});
  let totalProductsQuery = Product.find({});

  console.log(req.query.category);

  if (req.query.category) {
    query = query.find({ category: { $in: req.query.category.split(",") } });
    totalProductsQuery = totalProductsQuery.find({
      category: { $in: req.query.category.split(",") },
    });
  }
  if (req.query.brand) {
    query = query.find({ brand: { $in: req.query.brand.split(",") } });
    totalProductsQuery = totalProductsQuery.find({
      brand: { $in: req.query.brand.split(",") },
    });
  }
  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
  }

  const totalDocs = await totalProductsQuery.count().exec();
  console.log({ totalDocs });

  if (req.query._page && req.query._limit) {
    const pageSize = req.query._limit;
    const page = req.query._page;
    query = query.skip(pageSize * (page - 1)).limit(pageSize);
  }

  try {
    const docs = await query.exec();
    res.set("X-Total-Count", totalDocs);
    res.status(200).json(docs);
  } catch (err) {
    next(err);
  }
};

export const fetchProductById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndUpdate(
      id,
      {
        $set: {
          title: req.body.title,
          price: req.body.price,
          thumbnail: req.body.thumbnail,
          brand: req.body.brand,
          category: req.body.category,
          description: req.body.description,
          discountPercentage: req.body.discountPercentage,
          rating: req.body.rating,
          stock: req.body.stock,
        },
      },
      {
        new: true,
      }
    );
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};
