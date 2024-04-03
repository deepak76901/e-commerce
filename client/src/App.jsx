// import { useState } from 'react'
import "./App.css";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import PageNotFound from "./pages/404";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import UserOrderPage from "./pages/UserOrderPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Protected from "./features/auth/components/Protected";
import { useEffect } from "react";
import { fetchItemsByUserIdAsync } from "./features/cart/CartSlice";
import { selectLoggedInUser } from "./features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import LogOut from "./features/auth/components/Logout";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ProtectedAdmin from "./features/auth/components/ProtectedAdmin";
import AdminHome from "./pages/AdminHome";
import AdminProductDetailsPage from "./pages/AdminProductDetailsPage";
import UserProfilePage from "./pages/UserProfilePage";
import { fetchLoggedInUserAsync } from "./features/user/userSlice";
import AddProductPage from "./pages/AddProductPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/admin",
    element: <AdminHome />,
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "signup",
    element: <SignupPage />,
  },
  {
    path: "/logout",
    element: <LogOut />,
  },
  {
    path: "/fp",
    element: <ForgotPasswordPage />,
  },
  {
    path: "cart",
    element: (
      <Protected>
        <CartPage />
      </Protected>
    ),
  },
  {
    path: "checkout",
    element: (
      <Protected>
        <Checkout />
      </Protected>
    ),
  },
  {
    path: "/product-detail/:id",
    element: <ProductDetailsPage />,
  },
  {
    path: "/admin/product-detail/:id",
    element: <AdminProductDetailsPage />,
  },
  {
    path: "/admin/product-form",
    element: <AddProductPage />,
  },
  {
    path: "/admin/product-form/edit/:id",
    element: <AddProductPage />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
  {
    path: "/order-success/:id",
    element: <OrderSuccessPage />,
  },
  {
    path: "/orders",
    element: (
      <Protected>
        <UserOrderPage />
      </Protected>
    ),
  },
  {
    path: "/admin/orders",
    element: <AdminOrdersPage />,
  },
  {
    path: "/profile",
    element: (
      <Protected>
        <UserProfilePage />
      </Protected>
    ),
  },
]);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync(user._id));
      dispatch(fetchLoggedInUserAsync(user._id));
    }
  }, [user]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
