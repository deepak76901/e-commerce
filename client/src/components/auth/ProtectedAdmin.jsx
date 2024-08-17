import React from "react";
import { Navigate } from "react-router-dom";
import { selectLoggedInUser } from "../../Redux/slices/authSlice";
import { useSelector } from "react-redux";

function ProtectedAdmin({ children }) {
  const user = useSelector(selectLoggedInUser);

  if (!user) {
    return <Navigate to="/login" replace={true}></Navigate>;
  }

  if (user && !user.isAdmin) {
    return <Navigate to="/" replace={true}></Navigate>;
  }

  return children;
}

export default ProtectedAdmin;
