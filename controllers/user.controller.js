import { User } from "../models/User.model.js";
import { Orders } from "../models/order.model.js";
import { errorHandler } from "../utils/errorHandler.js";

export const fetchUserById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      addresses: user.addresses,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const { id, username, email, addresses } = await User.findByIdAndUpdate(
      userId,
      req.body,
      {
        new: true,
      }
    );

    res.status(201).json({ id, username, email, addresses });
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (req, res, next) => {
  try {
    if(!req.body.selectedAddress){
      return next(errorHandler(400,"Address required"))
    }
    const order = new Orders(req.body);
    order.save();
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

export const fetchUserOrders = async (req, res, next) => {
  try {
    const orders = await Orders.find({userId:req.params.userId});
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};
