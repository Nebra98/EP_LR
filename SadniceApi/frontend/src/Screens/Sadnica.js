import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import Product from "../components/Product";

const Sadnica = (props) => {
  const navigate = useNavigate();

  const back = () => {
    navigate("/");
  };
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
  return (
    <div>
      <div className="product ">
        <div className="row top">
          <div className="col-2">
            <img
              className="large"
              src={data.Sadnice.slika}
              alt={data.Sadnice.naziv}
            ></img>
          </div>
          <div className="col-1">
            <ul>
              <li>
                <h1>{data.Sadnice.naziv}</h1>
              </li>

              {/* <li>Cijena : {data.cijena} €</li> */}
              <li>
                Description:
                <p>{data.Sadnice.opis}</p>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <button onClick={() => back()}>Go Back</button>
        </div>
      </div>
    </div>
  );
};

export default Sadnica;
