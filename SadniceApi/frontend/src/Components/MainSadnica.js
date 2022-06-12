import React, { useEffect, useState } from "react";
import Sadnica from "./Sadnica";

const MainSadnica = (props) => {
  let [data, setData] = useState();
  useEffect(() => {
    fetch("http://localhost:5000/sadnica", {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "null",
      },
      mode: "cors",
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => setData(json));
  }, []);

  const { searchName, onAdd } = props;

  return (
    <main className="block col-2">
      <h2>Products</h2>
      <div className="row">
        <Sadnica searchName={searchName} onAdd={onAdd} product={data}></Sadnica>
      </div>
    </main>
  );
};

export default MainSadnica;
