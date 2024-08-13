import React from "react";
import { Navigate } from "react-router-dom";
import { selectLoggedInUser } from "../authSlice";
import { useSelector } from "react-redux";

function Protected({ children }) {
  const user = useSelector(selectLoggedInUser);

  if (!user) {
    return <Navigate to="/product-detail/1" replace={true}></Navigate>;
  }
  return children;
}

export default Protected;
