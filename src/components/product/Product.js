import React from "react";
import "./Product.css";

function Product({ id, title, image, price, rating }) {
  return (
    <div key={id} className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
        <p> {" ⭐".repeat(rating)}</p>
        </div>
      </div>
      <img src={image} alt="product" />
      <button>Add to Basket</button>
    </div>
  );
}

export default Product;
