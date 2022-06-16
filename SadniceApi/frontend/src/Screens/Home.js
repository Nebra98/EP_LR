import React from "react";
import Navigacija from "../Components/Navigacija";

const Home = () => {
  return (
    <div className="home">
      <div className="opacity">
        <Navigacija></Navigacija>
      </div>
      <div className="block opacity1">Neki tekst?</div>
    </div>
  );
};

export default Home;
