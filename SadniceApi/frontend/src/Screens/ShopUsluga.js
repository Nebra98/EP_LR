import React, { useEffect, useState } from "react";
import MainUsluga from "../Components/MainUsluga";
import Navigacija from "../Components/Navigacija";
const ShopUsluga = () => {
  const uslugaLoad = JSON.parse(localStorage.getItem("usluga" || "[]"));

  var [usluga, setCartItems] = useState(uslugaLoad);
  useEffect(() => {
    localStorage.setItem("usluga", JSON.stringify(usluga));
  }, [usluga]);

  if (!usluga) {
    usluga = [];
  }

  const onAdd = (product) => {
    localStorage.setItem("usluga", JSON.stringify(product));

    const exist = usluga.find((x) => x.id === product.id);
    if (exist) {
      setCartItems(
        usluga.map((x) =>
          x.id === product.id ? { ...exist, broj: exist.broj } : x
        )
      );
    } else {
      setCartItems([...usluga, { ...product, broj: 1 }]);
    }
  };

  let [search, setSearch] = useState("");

  return (
    <div className="usluge">
      <div className="opacity">
        <Navigacija></Navigacija>
      </div>

      <div className="box opacity1">
        <input
          className="search"
          type="text"
          id="search"
          placeholder=" Search"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="opacity1">
        <MainUsluga searchName={search} onAdd={onAdd}></MainUsluga>
      </div>
    </div>
  );
};

export default ShopUsluga;
