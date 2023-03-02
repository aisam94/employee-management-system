import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isExpired } from "react-jwt";

const AuthWrapper = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const token = userInfo ? userInfo.token : "";

  return isExpired(token) ? <Navigate to="/login" replace /> : <Outlet />;
};

export default AuthWrapper;
