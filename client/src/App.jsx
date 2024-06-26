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
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import ScrollToTop from "./app/ScrollToTop";
import Navbar from "./features/Navbar/Navbar";
import Footer from "./features/Navbar/Footer";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync(user._id));
      dispatch(fetchLoggedInUserAsync(user._id));
    }
  }, [user]);

  if(localStorage.getItem("token")){
  }

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route
            path="/"
            element={
              <Protected>
                <Navbar />
                <Home />
                <Footer/>
              </Protected>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedAdmin>
                <Navbar />
                <AdminHome />
                <Footer/>
              </ProtectedAdmin>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/logout" element={<LogOut />} />
          <Route path="/fp" element={<ForgotPasswordPage />} />
          <Route
            path="*"
            element={
              <>
                <Navbar />
                <PageNotFound />
                <Footer/>
              </>
            }
          />
          <Route
            path="/cart"
            element={
              <Protected>
                <Navbar />
                <CartPage />
                <Footer/>
              </Protected>
            }
          />
          <Route
            path="/checkout"
            element={
              <Protected>
                <Navbar />
                <Checkout />
                <Footer/>
              </Protected>
            }
          />
          <Route
            path="/product-detail/:id"
            element={
              <Protected>
                <Navbar />
                <ProductDetailsPage />
                <Footer/>
              </Protected>
            }
          />
          <Route
            path="/profile"
            element={
              <Protected>
                <Navbar />
                <UserProfilePage />
                <Footer/>
              </Protected>
            }
          />
          <Route
            path="/orders"
            element={
              <Protected>
                <Navbar />
                <UserOrderPage />
                <Footer/>
              </Protected>
            }
          />
          <Route
            path="/order-success/:id"
            element={
              <Protected>
                <Navbar />
                <OrderSuccessPage />
                <Footer/>
              </Protected>
            }
          />
          <Route
            path="/admin/product-detail/:id"
            element={
              <ProtectedAdmin>
                <Navbar />
                <AdminProductDetailsPage />
                <Footer/>
              </ProtectedAdmin>
            }
          />
          <Route
            path="/admin/product-form"
            element={
              <ProtectedAdmin>
                <Navbar />
                <AddProductPage />
                <Footer/>
              </ProtectedAdmin>
            }
          />
          <Route
            path="/admin/product-form/edit/:id"
            element={
              <ProtectedAdmin>
                <Navbar />
                <AddProductPage />
                <Footer/>
              </ProtectedAdmin>
            }
          />

          <Route
            path="/admin/orders"
            element={
              <ProtectedAdmin>
                <Navbar />
                <AdminOrdersPage />
                <Footer/>
              </ProtectedAdmin>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
