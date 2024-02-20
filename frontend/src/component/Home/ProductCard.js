import React from "react";
import { Link } from "react-router-dom";
// import { Rating } from "@mui/lab";
import ReactStars from "react-rating-stars-component";

const ProductCard = ({ product }) => {
  // const options = {
  //   value:  dummyProduct.numOfReviews,
  //   readOnly: true,
  //   precision: 0.5,
  // };

  const dummyProduct = {
    images: [
      {
        url: "https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c08476774.png",
      },
    ],
    name: "Hp laptop",
    numOfReviews: 3.2,
    price: 500,
  };
  const options = {
    value:  dummyProduct.numOfReviews,
    readOnly: true,
    precision: 0.5,
    isHalf:true
  };

  const displayedProduct = product || dummyProduct;

  return (
    <Link className="productCard" to={`/product/${displayedProduct._id}`}>
      <img src={displayedProduct.images[0].url} alt={displayedProduct.name} />
      <p>{displayedProduct.name}</p>
      <div>
        {/* <Rating {...options} />{" "} */}
        <ReactStars {...options} />
   
        <span className="productCardSpan">
          {" "}
          ({displayedProduct.numOfReviews} Reviews)
        </span>
      </div>
      <span>{`₹${displayedProduct.price}`}</span>
    </Link>
  );
};

export default ProductCard;
