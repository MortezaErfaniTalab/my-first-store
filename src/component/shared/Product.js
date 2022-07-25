import React, { useContext } from "react";
import { Link } from "react-router-dom";

// Functions
import { shorter, quantityCount } from "../../helpers/functions";

// Context
import { CartContext } from "../../context/CartContextProvider";

// Icons
import trashIcon from "../../assets/icons/icons8-trash.svg";

const Product = ({ productData }) => {
  const {state, dispatch} = useContext(CartContext);

  return (
    <div>
      <img src={productData.image} alt="product" style={{ width: "200px" }} />
      <h3>{shorter(productData.title)}</h3>
      <p>{productData.price}</p>
      <div>
        <Link to={`/products/${productData.id}`}>Detail</Link>
        <div>
          {quantityCount(state, productData.id) === 1 && (
            <button
              onClick={() =>
                dispatch({ type: "REMOVE_ITEM", payload: productData })
              }
            >
              <img src={trashIcon} alt="trash" />
            </button>
          )}

          {quantityCount(state, productData.id) > 1 && (
            <button
              onClick={() =>
                dispatch({ type: "DECREASE", payload: productData })
              }
            >
              -
            </button>
          )}

          {quantityCount(state, productData.id) > 0 && (
            <span>{quantityCount(state, productData.id)}</span>
          )}

          {quantityCount(state, productData.id) > 0 ? (
            <button
              onClick={() =>
                dispatch({ type: "INCREASE", payload: productData })
              }
            >
              +
            </button>
          ) : (
            <button
              onClick={() =>
                dispatch({ type: "ADD_ITEM", payload: productData })
              }
            >
              Add To Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
