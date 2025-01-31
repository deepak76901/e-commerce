import React from "react";
import { Navigate } from "react-router-dom";
import { selectLoggedInUser } from "../../Redux/slices/authSlice";
import { useSelector } from "react-redux";
import { useUser } from "@clerk/clerk-react";

function Protected({ children }) {
  const {isLoaded, isSignedIn, user} = useUser();

  if (!user) {
    return <Navigate to="/sign-in" replace={true}></Navigate>;
  }
  return children;
}

export default Protected;
