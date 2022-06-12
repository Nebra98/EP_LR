import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Basket = (props) => {
  //   const dispatch = useDispatch();
  //   const productList = useSelector((state) => state.productList);

  //   let { product } = { products: {} };
  //   product = productList.products;

  //   useEffect(() => {
  //     dispatch(listProducts({}));
  //   }, [dispatch]);
  const uslugaLoad = JSON.parse(localStorage.getItem("usluga" || "[]"));
  const sadnicaLoad = JSON.parse(localStorage.getItem("sadnica" || "[]"));
  const userInfoLoad = JSON.parse(localStorage.getItem("userInfo" || "[]"));
  const [userInfo, setUserInfo] = useState(userInfoLoad);

  let [usluga, setUsluga] = useState(uslugaLoad);
  let [sadnica, setSadnica] = useState(sadnicaLoad);
  useEffect(() => {
    localStorage.setItem("usluga", JSON.stringify(usluga));
    localStorage.setItem("sadnica", JSON.stringify(sadnica));
  }, [usluga, sadnica]);

  if (!usluga) {
    usluga = [];
  }
  if (!sadnica) {
    sadnica = [];
  }

  const { data } = props;
  const [name, setName] = useState("");

  let cijenaUsluge = usluga.reduce((a, c) => a + c.broj * c.price, 0);
  let cijenaSadnice = sadnica.reduce((a, c) => a + c.broj * c.price, 0);
  let totalPrice = cijenaUsluge + cijenaSadnice;

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    window.alert("Narudžba zaprimljena");
    if (sadnica.length !== 0) {
      console.log(JSON.stringify(sadnica));
      fetch("http://localhost:5000/sadnica_korisnik", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json,",
          "Access-Control-Allow-Origin": "*",
          "x-access-token": userInfo.token,
        }),
        body: JSON.stringify(sadnica),
        mode: "cors",
      }).then(() => {
        console.log(sadnica);
      });

      localStorage.removeItem("sadnica");
    }

    if (usluga.length !== 0) {
      fetch("http://localhost:5000/usluga_korisnik", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json,",
          "Access-Control-Allow-Origin": "*",
          "x-access-token": userInfo.token,
        }),
        body: JSON.stringify(usluga),
        mode: "cors",
      }).then(() => {
        console.log("new order added");
      });

      localStorage.removeItem("usluga");
    }

    navigate("/");
  };

  const onAddSadnica = (product) => {
    localStorage.setItem("sadnica", JSON.stringify(product));

    const sadnicaExist = sadnica.find((x) => x.id === product.id);
    if (sadnicaExist) {
      setSadnica(
        sadnica.map((x) =>
          x.id === product.id
            ? { ...sadnicaExist, broj: sadnicaExist.broj + 1 }
            : x
        )
      );
    } else {
      setSadnica([...sadnica, { ...product, broj: 1 }]);
    }
  };

  const onAddUsluga = (product) => {
    localStorage.setItem("usluga", JSON.stringify(product));

    const uslugaExist = usluga.find((x) => x.id === product.id);
    if (uslugaExist) {
      setUsluga(
        usluga.map((x) =>
          x.id === product.id
            ? { ...uslugaExist, broj: uslugaExist.broj + 1 }
            : x
        )
      );
    } else {
      setUsluga([...usluga, { ...product, broj: 1 }]);
    }
  };

  const onRemoveSadnica = (product) => {
    const sadnicaExist = sadnica.find((x) => x.id === product.id);
    if (sadnicaExist.broj === 1) {
      setSadnica(sadnica.filter((x) => x.id !== product.id));
    } else {
      setSadnica(
        sadnica.map((x) =>
          x.id === product.id
            ? { ...sadnicaExist, broj: sadnicaExist.broj - 1 }
            : x
        )
      );
    }
  };

  const onRemoveUsluga = (product) => {
    const uslugaExist = usluga.find((x) => x.id === product.id);
    if (uslugaExist.broj === 1) {
      setUsluga(usluga.filter((x) => x.id !== product.id));
    } else {
      setUsluga(
        usluga.map((x) =>
          x.id === product.id
            ? { ...uslugaExist, broj: uslugaExist.broj - 1 }
            : x
        )
      );
    }
  };

  return (
    <div className="block col-1">
      <form className="form">
        <h2>Korpa</h2>
        <div>
          {sadnica.length === 0 && usluga.length === 0 && (
            <div>Korpa je prazna</div>
          )}
          {(sadnica.length !== 0 || usluga.length !== 0) && (
            <>
              {sadnica.length !== 0 && (
                <>
                  <h2>Sadnice</h2>

                  {sadnica.map((item) => (
                    <div key={item.id} className="row">
                      <div className="col-2">{item.naziv}</div>
                      <div className="col-2">
                        <button
                          type="button"
                          onClick={() => onRemoveSadnica(item)}
                          className="remove"
                        >
                          -
                        </button>{" "}
                        <button
                          type="button"
                          onClick={() => onAddSadnica(item)}
                          className="add"
                        >
                          +
                        </button>
                      </div>

                      <div className="col-2 text-right">
                        {item.broj} x {Number(item.cijena).toFixed(2)} €
                      </div>
                    </div>
                  ))}
                </>
              )}
              {usluga.length !== 0 && (
                <>
                  <h2>Usluge</h2>
                  {usluga.map((item) => (
                    <div key={item.id} className="row">
                      <div className="col-2">{item.naziv}</div>
                      <div className="col-2">
                        <button
                          type="button"
                          onClick={() => onRemoveUsluga(item)}
                          className="remove"
                        >
                          -
                        </button>{" "}
                        <button
                          type="button"
                          onClick={() => onAddUsluga(item)}
                          className="add"
                        >
                          +
                        </button>
                      </div>

                      <div className="col-2 text-right">
                        {item.broj} x {Number(item.cijena).toFixed(2)} €
                      </div>
                    </div>
                  ))}
                </>
              )}

              <div className="row">
                <div className="col-2">
                  <strong>Total Price</strong>
                </div>
                <div className="col-1 text-right">
                  <div className="none"></div>
                  <strong>{totalPrice.toFixed(2)} €</strong>
                </div>
              </div>

              <div className="row">
                <button
                  type="button"
                  className="primary"
                  disabled={sadnica.length === 0 && usluga.length === 0}
                  onClick={submitHandler}
                >
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default Basket;
