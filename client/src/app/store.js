import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/Product/ProductSlice";
import authReducer from "../features/auth/authSlice";
import cartReducer from "../features/cart/CartSlice";
import orderReducer from "../features/order/OrderSlice";
import userReducer from "../features/user/userSlice";
import themeReducer from "../features/Theme/ThemeSlice"

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
