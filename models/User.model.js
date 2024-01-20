import  { Schema, SchemaType, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default:"user"
  },
  addresses: {
    type: [SchemaType.Mixed],
  },
  orders:{
    type:[SchemaType.Mixed]
  }
});

const virtuals = userSchema.virtual("id");
virtuals.get(function () {
  return this._id;
});

userSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    return ret._id;
  },
});

export const User = model("User",userSchema) 
