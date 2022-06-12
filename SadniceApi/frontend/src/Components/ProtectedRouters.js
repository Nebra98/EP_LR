import React from "react";
import { Outlet } from "react-router-dom";
import Home from "../Screens/Home";

const useAuth = () => {
  let user = JSON.parse(localStorage.getItem("userInfo"));

  return user && user.admin;
};

const ProtectedRouters = () => {
  const isAuth = useAuth();

  return isAuth ? <Outlet /> : <Home />;
};

export default ProtectedRouters;
