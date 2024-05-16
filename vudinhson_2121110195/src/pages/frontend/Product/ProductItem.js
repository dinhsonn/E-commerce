import { Link } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";

import Swal from "sweetalert2";
import CartService from "../../../services/CartService";
import WishlistService from "../../../services/WishlistService";
import Header from "../../../components/Public/Header";
import Footer from "../../../components/Public/Footer";
const getImgUrl = (imageName) => {
  const endpoint = 'productimages'; 
  return `http://localhost:8384/api/${endpoint}/image/${imageName}`;
};


function ProductItem(props) {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  useEffect(() => {
    CartService.getCartItems()
      .then((response) => {
        setCartItems(response.data);
      })
      .catch((error) => {
        console.error('Error fetching cart items:', error);
      });
  }, []);
  const handleAddToCart = () => {
    console.log("Adding to cart:", props.product.id, 1,props.product.image); 
    CartService.addToCart(props.product.id, 1,props.product.image)
      .then(() => {
        Swal.fire(
          "The product has been added to cart.",
          "Your product has been added to the cart!",
          "success"
        );
      })
      .catch((error) => {
        console.error("Error adding to cart: ", error);
      });
  };
  //WISHLIST
  useEffect(() => {
    WishlistService.getWishlistItems()
      .then((response) => {
        setWishlistItems(response.data);
      })
      .catch((error) => {
        console.error('Error fetching cart items:', error);
      });
  }, []);
  const handleAddToWishlist = () => {

    console.log("Adding to wishlist:", props.product.id,props.product.image); 
    WishlistService.addToWishlist(props.product.id,props.product.image)
      .then(() => {
   
        Swal.fire(
          "The product has been added to wishlist.",
          "Your product has been added to the wishlist!",
          "success"
        );
      })
      .catch((error) => {
        console.error("Error adding to wishlist: ", error);
      });
  };
    return ( 

      <div className="col-6 col-md-4 col-lg-3 col-xl-5col">
      <div className="product product-11 text-center">
        <figure className="product-media">
        <Link to={`/productdetail/${props.product.id}?image=${props.product.image}&image2=${props.product.image2}`}>
            <img
              src={getImgUrl(props.product.image)}
              alt="Product image"
              className="product-image"
            />
            <img
              src={getImgUrl(props.product.image2)}
              alt="Product image"
              className="product-image-hover"
            />
          </Link>
          <div className="product-action-vertical">
            <a href="#" onClick={handleAddToWishlist} className="btn-product-icon btn-wishlist ">
              <span>add to wishlist</span>
            </a>
          </div>
          {/* End .product-action-vertical */}
        </figure>
        {/* End .product-media */}
        <div className="product-body">
          <div className="product-cat">
            <a href="#">{props.product.brandId.name}</a>
          </div>
          {/* End .product-cat */}
          <h3 className="product-title">
            <a href="product.html">{props.product.title}</a>
          </h3>
          {/* End .product-title */}
          <div className="product-price">${props.product.price}</div>
          {/* End .product-price */}
        </div>
        {/* End .product-body */}
        <div className="product-action">
          <a  onClick={handleAddToCart}  className="btn-product btn-cart">
            
            <span>add to cart</span>
          </a>
        </div>
        {/* End .product-action */}
      </div>
      {/* End .product */}
    </div>

     );
}

export default ProductItem;