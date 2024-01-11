import mongoose, { Schema } from "mongoose";
const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: { type: Number, min: [0, "Minimum price is 0"] },
  discountPercentage: {
    type: Number,
    min: [1, "Minimum discountPercentage is 0%"],
    max: [99, "Max discountPercentage is 99%"],
  },
  rating: {
    type: Number,
    min: [0, "Minimum rating is 0"],
    max: [5, "Max rating is 5"],
    default: 0,
  },
  stock: { type: Number, min: [0, "Minimum Stock is 0"] },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
});

const virtuals = productSchema.virtual("id");
virtuals.get(function () {
  return this._id;
});

productSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export const Product = mongoose.model("Product", productSchema);
