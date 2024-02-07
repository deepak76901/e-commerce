import { Schema, model } from "mongoose";


const cartSchema = new Schema({
  quantity: { type: Number, required: true, default: 0 },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
});

const virtuals = cartSchema.virtual("id");
virtuals.get(function () {
  return this._id;
});

cartSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export const Cart = model("Cart", cartSchema);
