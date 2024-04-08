import { Schema, SchemaType, SchemaTypes, model } from "mongoose";

const orderSchema = new Schema(
  {
    userId: {
      type: SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    selectedAddress: {
      type: Object,
      required: true,
    },
    items: { type: [SchemaType.Mixed] },
    totalItems: Number,
    totalAmount: Number,
    paymentMethod: String,
    status: String,
  }
);

export const Orders = model("Orders", orderSchema);
