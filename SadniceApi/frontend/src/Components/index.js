import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../Screens/Home";
import Signin from "../Screens/Signin";
import Register from "../Screens/Register";
const index = () => {
  return (
    <Router>
      <Routes>
        <Route exacth path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default index;
