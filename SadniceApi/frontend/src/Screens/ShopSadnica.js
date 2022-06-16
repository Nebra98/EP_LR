import React, { useEffect, useState } from "react";
import MainSadnica from "../Components/MainSadnica";
import Navigacija from "../Components/Navigacija";
const ShopSadnica = () => {
  const sadnicaLoad = JSON.parse(localStorage.getItem("sadnica" || "[]"));

  var [sadnica, setSadnica] = useState(sadnicaLoad);
  useEffect(() => {
    localStorage.setItem("sadnica", JSON.stringify(sadnica));
  }, [sadnica]);

  if (!sadnica) {
    sadnica = [];
  }

  const onAdd = (product) => {
    localStorage.setItem("sadnica", JSON.stringify(product));

    const exist = sadnica.find((x) => x.id === product.id);
    if (exist) {
      setSadnica(
        sadnica.map((x) =>
          x.id === product.id ? { ...exist, broj: exist.broj + 1 } : x
        )
      );
    } else {
      setSadnica([...sadnica, { ...product, broj: 1 }]);
    }
  };

  let [search, setSearch] = useState("");

  return (
    <div className="sadnice">
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
        <MainSadnica searchName={search} onAdd={onAdd}></MainSadnica>
      </div>
    </div>
  );
};

export default ShopSadnica;
