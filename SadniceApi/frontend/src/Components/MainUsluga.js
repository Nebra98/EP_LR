import React, { useEffect, useState } from "react";
import Usluga from "./Usluga";
// import { useDispatch, useSelector } from "react-redux";
// import { listProducts } from "../actions/productActions";

const MainUsluga = (props) => {
  // const dispatch = useDispatch();
  // const productList = useSelector((state) => state.productList);

  // let { product } = { products: {} };
  // product = productList.products;

  // useEffect(() => {
  //   dispatch(listProducts({}));
  // }, [dispatch]);
  const clickHandler1 = () => {
    console.log(data.Usluge);
  };
  let [data, setData] = useState();
  useEffect(() => {
    fetch("http://localhost:5000/usluga", {
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
        <button className="primary" type="button" onClick={clickHandler1}>
          click
        </button>
        <Usluga searchName={searchName} onAdd={onAdd} product={data}></Usluga>
      </div>
    </main>
  );
};

export default MainUsluga;
