import React from "react";
import { Link } from "react-router-dom";

const Product = (props) => {
  const { searchName, onAdd, product } = props;

  return (
    <div>
      {product === undefined
        ? null
        : product.Sadnice.map((product) => (
            <div key={product.id} className="flex">
              {product.naziv
                .toLowerCase()
                .includes(searchName.toLowerCase()) ? (
                <div className="product">
                  <Link to={`/sadnica/${product.id}`}>
                    <img
                      className="small"
                      src={product.slika}
                      alt={product.naziv}
                    />
                  </Link>

                  <Link to={`/sadnica/${product.id}`}>
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
export default Product;