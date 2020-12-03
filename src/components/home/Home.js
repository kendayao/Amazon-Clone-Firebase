import React from "react";
import "./Home.css";
import Product from "../product/Product";

function Home() {
  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src="https://images-na.ssl-images-amazon.com/images/G/01/kindle/journeys/YzExNTRjZmUt/YzExNTRjZmUt-YTJjN2Q5MTct-w1500._CB414654619_.jpg"
          alt="banner"
        />

        <div className="home__row">
          <Product />
        </div>

        <div className="home__row"></div>

        <div className="home__row"></div>
      </div>
    </div>
  );
}

export default Home;
