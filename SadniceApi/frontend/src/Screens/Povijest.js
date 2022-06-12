import React, { useEffect, useState } from "react";

const OrderHistory = (props) => {
  const userInfoLoad = JSON.parse(localStorage.getItem("userInfo" || "[]"));

  const [userInfo, setUserInfo] = useState(userInfoLoad);

  let [dataSadnice, setDataSadnice] = useState({});
  let [dataUsluge, setDataUsluge] = useState({});

  useEffect(() => {
    fetch("http://localhost:5000/sadnica_korisnik", {
      method: "GET",
      headers: new Headers({
        "Access-Control-Allow-Origin": "null",
        "x-access-token": userInfo.token,
      }),
      mode: "cors",
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => setDataSadnice(json));
  }, [userInfo.token]);
  useEffect(() => {
    fetch("http://localhost:5000/usluga_korisnik", {
      method: "GET",
      headers: new Headers({
        "Access-Control-Allow-Origin": "null",
        "x-access-token": userInfo.token,
      }),
      mode: "cors",
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => setDataUsluge(json));
  }, [userInfo.token]);

  return (
    <div className="App">
      <h1>Order History</h1>
      <h2>Sadnice</h2>
      <table className="table">
        {dataSadnice.Sadnice !== undefined
          ? dataSadnice.Sadnice.map((order) => (
              <tbody key={order.id}>
                <div id={order.id}>
                  <tr className="long">
                    <th>Naziv</th>
                    <td>{order.sadnica}</td>
                  </tr>

                  <tr>
                    <th>Cijena</th>
                    <td>{order.cijena} €</td>
                  </tr>
                  <tr className="long">
                    <th>Količina</th>
                    <td>{order.broj}</td>
                  </tr>
                </div>
              </tbody>
            ))
          : null}
      </table>
      <h2>Usluge</h2>
      <table className="table">
        {dataUsluge.Usluge !== undefined
          ? dataUsluge.Usluge.map((order) => (
              <tbody key={order.id}>
                <div id={order.id}>
                  <tr className="long">
                    <th>Naziv</th>
                    <td>{order.usluga}</td>
                  </tr>

                  <tr>
                    <th>Cijena</th>
                    <td>{order.cijena} €</td>
                  </tr>
                </div>
              </tbody>
            ))
          : null}
      </table>
    </div>
  );
};

export default OrderHistory;
