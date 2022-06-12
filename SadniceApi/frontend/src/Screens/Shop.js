import React, { useEffect, useState } from "react";
import Main from "../Components/Main";
const Shop = () => {
  const cartItemsLoad = JSON.parse(localStorage.getItem("cartItems" || "[]"));

  var [cartItems, setCartItems] = useState(cartItemsLoad);
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  if (!cartItems) {
    cartItems = [];
  }

  const onAdd = (product) => {
    localStorage.setItem("cartItems", JSON.stringify(product));

    const varijabla = JSON.parse(localStorage.getItem("cartItems"));

    const exist = cartItems.find((x) => x._id === product._id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x._id === product._id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };
  const onRemove = (product) => {
    const exist = cartItems.find((x) => x._id === product._id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x._id !== product._id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x._id === product._id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
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
      <Main searchName={search} onAdd={onAdd}></Main>
    </div>
  );
};

export default Shop;
