import React, { useEffect, useState } from "react";
import MainUsluga from "../Components/MainUsluga";
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

    const varijabla = JSON.parse(localStorage.getItem("usluga"));

    const exist = usluga.find((x) => x.id === product.id);
    if (exist) {
      setCartItems(
        usluga.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...usluga, { ...product, qty: 1 }]);
    }
  };

  let [search, setSearch] = useState("");

  return (
    <div>
      <div className="box">
        <input
          className="search"
          type="text"
          id="search"
          placeholder=" Search"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <MainUsluga searchName={search} onAdd={onAdd}></MainUsluga>
    </div>
  );
};

export default ShopUsluga;