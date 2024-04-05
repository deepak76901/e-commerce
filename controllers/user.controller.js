import { User } from "../models/User.model.js";

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

export const updateUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    }).exec();
    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
