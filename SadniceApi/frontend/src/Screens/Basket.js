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
  const cartItemsLoad = JSON.parse(localStorage.getItem("cartItems" || "[]"));

  var [cartItems, setCartItems] = useState(cartItemsLoad);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const { data } = props;
  const [name, setName] = useState("");

  var totalPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    navigate("/shipping");
  };

  let tp = cartItems.reduce((a, c) => a + c.qty * c.price, 0);

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
  return (
    <div className="block col-1">
      <form className="form">
        <h2>Cart Items</h2>
        <div>
          {cartItems.length === 0 && <div>Cart is empty</div>}
          {cartItems.map((item) => (
            <div key={item.id} className="row">
              <div className="col-2">{item.naziv}</div>
              <div className="col-2">
                <button
                  type="button"
                  onClick={() => onRemove(item)}
                  className="remove"
                >
                  -
                </button>{" "}
                <button
                  type="button"
                  onClick={() => onAdd(item)}
                  className="add"
                >
                  +
                </button>
              </div>

              <div className="col-2 text-right">
                {item.qty} x {Number(item.cijena).toFixed(2)} €
              </div>
            </div>
          ))}

          <input
            type="text"
            placeholder="Promotion Code"
            id="promo-code"
            onChange={(f) => setName(f.target.value)}
          />

          {cartItems.length !== 0 && (
            <>
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
                  disabled={cartItems.length === 0}
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
