// import { useState } from 'react'

import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// # Components
import Protected from "./components/auth/Protected";
import { fetchItemsByUserIdAsync } from "./Redux/slices/CartSlice";
import { selectLoggedInUser, auto_Login_Async } from "./Redux/slices/authSlice";
import LogOut from "./components/auth/Logout";
import ProtectedAdmin from "./components/auth/ProtectedAdmin";
import { fetchLoggedInUserAsync } from "./Redux/slices/userSlice";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./app/ScrollToTop";

// # All Pages
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import UserOrderPage from "./pages/UserOrderPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import AdminProductDetailsPage from "./pages/AdminProductDetailsPage";
import UserProfilePage from "./pages/UserProfilePage";
import AddProductPage from "./pages/AddProductPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import AdminHome from "./pages/AdminHome";
import Checkout from "./pages/Checkout";
import PageNotFound from "./pages/404";
import Home from "./pages/Home";
import SignInPage from "./components/auth/sign-in";
import SignUpPage from "./components/auth/sign-up";
import Align_Center from "./components/Align_Center";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  // const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    console.log("Dispatching start");

    // dispatch(auto_Login_Async())
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync(user._id));
      dispatch(fetchLoggedInUserAsync(user._id));
    }
  }, [user]);

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route
            path="/sign-in"
            element={
              <Align_Center>
                <SignInPage />
              </Align_Center>
            }
          />
          <Route
            path="/sign-up"
            element={
              <Align_Center>
                <SignUpPage />
              </Align_Center>
            }
          />
          <Route path="/logout" element={<LogOut />} />
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Home />
                <Footer />
              </>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedAdmin>
                <Navbar />
                <AdminHome />
                <Footer />
              </ProtectedAdmin>
            }
          />
          <Route path="/fp" element={<ForgotPasswordPage />} />
          <Route
            path="*"
            element={
              <>
                <Navbar />
                <PageNotFound />
                <Footer />
              </>
            }
          />
          <Route
            path="/cart"
            element={
              <>
                <Navbar />
                <CartPage />
                <Footer />
              </>
            }
          />
          <Route
            path="/checkout"
            element={
              <>
                <Navbar />
                <Checkout />
                <Footer />
              </>
            }
          />
          <Route
            path="/product-detail/:id"
            element={
              <>
                <Navbar />
                <ProductDetailsPage />
                <Footer />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <Navbar />
                <UserProfilePage />
                <Footer />
              </>
            }
          />
          <Route
            path="/orders"
            element={
              <>
                <Navbar />
                <UserOrderPage />
                <Footer />
              </>
            }
          />
          <Route
            path="/order-success/:id"
            element={
              <>
                <Navbar />
                <OrderSuccessPage />
                <Footer />
              </>
            }
          />
          <Route
            path="/admin/product-detail/:id"
            element={
              <ProtectedAdmin>
                <Navbar />
                <AdminProductDetailsPage />
                <Footer />
              </ProtectedAdmin>
            }
          />
          <Route
            path="/admin/product-form"
            element={
              <ProtectedAdmin>
                <Navbar />
                <AddProductPage />
                <Footer />
              </ProtectedAdmin>
            }
          />
          <Route
            path="/admin/product-form/edit/:id"
            element={
              <ProtectedAdmin>
                <Navbar />
                <AddProductPage />
                <Footer />
              </ProtectedAdmin>
            }
          />

          <Route
            path="/admin/orders"
            element={
              <ProtectedAdmin>
                <Navbar />
                <AdminOrdersPage />
                <Footer />
              </ProtectedAdmin>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
