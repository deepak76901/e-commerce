import { User } from "../models/User.model.js";
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
      orders: user.orders,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserAddress = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const { id, username,email,addresses } = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });

    res.status(201).json({ id,username,email,addresses });
  } catch (error) {
    next(error);
  }
};
