import { Cart } from "../models/cart.model.js";

export const fetchCartByUser = async (req, res, next) => {
  const { user } = req.query;

  try {
    const cartItems = await Cart.find({ user: user })
      .populate("user")
      .populate("product");
    res.status(200).json(cartItems);
  } catch (error) {
    next(error);
  }
};

export const addToCart = async (req, res, next) => {
  const cart = new Cart(req.body);
  try {
    const doc = await cart.save();
    const result = await doc.populate("product");
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteFromCart = async (req, res, next) => {
  const { id } = req.params;

  try {
    const doc = await Cart.findByIdAndDelete(id).exec();
    res.status(200).json(doc);
  } catch (error) {
    next(error);
  }
};

export const updateCart = async (req, res, next) => {
  const { id } = req.params;

  try {
    const cart = await Cart.findByIdAndUpdate(id, req.body, {
      new: true,
    }).exec();
    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};