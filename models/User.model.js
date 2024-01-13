import mongoose, { Schema, SchemaType } from "mongoose";

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

const virtual = userSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

userSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    return ret._id;
  },
});

export const User = mongoose.model("User",userSchema) 
