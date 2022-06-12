import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../Screens/Home";
import Signin from "../Screens/Signin";
import Register from "../Screens/Register";
import NoveSadnice from "../Screens/NoveSadnice";
import NoveUsluge from "../Screens/NoveUsluge";
import Sadnica from "../Screens/Sadnica";
import Shop from "../Screens/Shop";
import Basket from "../Screens/Basket";
const index = () => {
  return (
    <Router>
      <Routes>
        <Route exacth path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/novesadnice" element={<NoveSadnice />} />
        <Route path="/noveusluge" element={<NoveUsluge />} />
        {/* <Route path="/usluge" element={<Usluga />} /> */}
        <Route path="/shop" element={<Shop />} />
        <Route path="/basket" element={<Basket />} />

        <Route path="/sadnica/:id" element={<Sadnica />} />
      </Routes>
    </Router>
  );
};

export default index;
