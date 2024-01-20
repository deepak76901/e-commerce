import { Schema, model } from "mongoose";

const brandSchema = new Schema({
  value: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
});

const virtuals = brandSchema.virtual("id");
virtuals.get(function () {
  return this._id;
});

brandSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export const Brand = model("Brand", brandSchema);
