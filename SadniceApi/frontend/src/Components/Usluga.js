import React from "react";
import { Link } from "react-router-dom";

const Usluga = (props) => {
  const { searchName, onAdd, product } = props;

  return (
    <div>
      {product === undefined
        ? null
        : product.Usluge.map((product) => (
            <div key={product.id} className="flex">
              {product.naziv
                .toLowerCase()
                .includes(searchName.toLowerCase()) ? (
                <div className="product">
                  <div>{product.slika}</div>
                  <Link to={`/usluga/${product.id}`}>
                    <img
                      className="small"
                      src={product.slika}
                      alt={product.naziv}
                    />
                  </Link>

                  <Link to={`/usluga/${product.id}`}>
                    <h3>{product.naziv}</h3>
                  </Link>
                  <div>
                    <button onClick={() => onAdd(product)}>Add To Cart</button>
                  </div>
                </div>
              ) : null}
            </div>
          ))}
    </div>
  );
};
export default Usluga;
