import { Orders } from "../models/order.model.js";

export const fetchAll = async (req, res, next) => {
  try {

    let sortBy = req.query._sort || "totalAmount";
    let order = req.query._order || "asc";
    let page = req.query._page || 1;
    let pageSize = req.query._limit || 10;

    const docs = await Orders.find({})
      .skip(pageSize * (page - 1))
      .limit(pageSize)
      .sort({ [sortBy]: order });

    const totalDocs = await Orders.countDocuments();

    res.set("X-Total-Count", totalDocs);
    res.status(200).json(docs);
  } catch (error) {
    next(error);
  }
};
