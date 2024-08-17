import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/ProductSlice";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/CartSlice";
import orderReducer from "./slices//OrderSlice";
import userReducer from "./slices/userSlice";
import themeReducer from "../Theme/ThemeSlice"

export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
    user: userReducer,
    theme: themeReducer
  },
});
