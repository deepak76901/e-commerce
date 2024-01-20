import {Schema, model} from "mongoose"

const categorySchema = new Schema({
    value : {
        type :String,
        required : true
    },
    label : {
        type :String,
        required : true
    },
})

const virtuals = categorySchema.virtual("id");
virtuals.get(function () {
  return this._id;
});

categorySchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export const Category = model("Category",categorySchema)