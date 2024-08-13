// import { useState } from 'react'
import ProductDetailsPage from "../src/pages/ProductDetailsPage";
import CartPage from "../src/pages/CartPage";
import Checkout from "../src/pages/Checkout";
import Home from "../src/pages/Home";
import LoginPage from "../src/pages/LoginPage";
import SignupPage from "../src/pages/SignupPage";
import PageNotFound from "../src/pages/404";
import OrderSuccessPage from "../src/pages/OrderSuccessPage";
import UserOrderPage from "../src/pages/UserOrderPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Protected from "../src/features/auth/components/Protected";
import { useEffect } from "react";
import { fetchItemsByUserIdAsync } from "../src/features/cart/CartSlice";
import { selectLoggedInUser } from "../src/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import LogOut from "../src/features/auth/components/Logout";
import ForgotPasswordPage from "../src/pages/ForgotPasswordPage";
import ProtectedAdmin from "../src/features/auth/components/ProtectedAdmin";
import AdminHome from "../src/pages/AdminHome";
import AdminProductDetailsPage from "../src/pages/AdminProductDetailsPage";
import UserProfilePage from "../src/pages/UserProfilePage";
import { fetchLoggedInUserAsync } from "../src/features/user/userSlice";
import AddProductPage from "../src/pages/AddProductPage";
import AdminOrdersPage from "../src/pages/AdminOrdersPage";
import ScrollToTop from "../src/app/ScrollToTop";
import Navbar from "../src/features/Navbar/Navbar";
import Footer from "../src/features/Navbar/Footer";

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
              <>
                <ProductDetailsPage />
                <Footer/>
              </>
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
