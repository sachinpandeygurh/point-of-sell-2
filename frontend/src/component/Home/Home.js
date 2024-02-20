import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import MetaData from "../layout/metadata.js";
import { clearErrors, getProduct } from "../../action/productAction";
import { useSelector, useDispatch } from "react-redux";
import Products from "./product.js";
// import Loader from "../layout/Loader/Loader";
// import { useAlert } from "react-alert";

const Home = () => {
  
  // const alert = useAlert();
  const dispatch = useDispatch();
  const {loading, error, products , productsCount } = useSelector((state) => state.products);
  console.log(dispatch(getProduct()))


  useEffect(() => {
    dispatch(getProduct());
    // if (error) {
    //   alert.error(error);
    //   dispatch(clearErrors());
    // }
    
  }, [dispatch]);

  return (
    <Fragment>
     <MetaData title="Ecommerce - Home Page"  />
          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
           
             {products&& products.map(product=>(
              <Products product={product}/>
             ))}
             
          </div>
        </Fragment>
  );
};

export default Home;
