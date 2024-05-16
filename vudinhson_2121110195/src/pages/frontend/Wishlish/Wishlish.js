import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import WishlistService from "../../../services/WishlistService";
function Wishlist() {
  document.title="Wishlist";
  const [wishlistItems, setWishlistItems] = useState([]);
  useEffect(() => {
    WishlistService.getWishlistItems()
      .then((response) => {
        setWishlistItems(response.data);
      })
      .catch((error) => {
        console.error('Error fetching cart items:', error);
      });
  }, []);

  const removeItem = (productId) => {
    
    WishlistService.removeFromWishlist(productId)
      .then((response) => {
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            setWishlistItems((prevWishlistItems) => prevWishlistItems.filter(item => item.product.id !== productId));
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          }
        })
      })
      .catch((error) => {
        console.error('Error removing item from cart:', error);
      });

  };
    return (  
        <>
  <div className="page-wrapper">
    <main className="main">
      <div
        className="page-header text-center"
        style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}
      >
        <div className="container">
          <h1 className="page-title">
            Wishlist<span>Shop</span>
          </h1>
        </div>
        {/* End .container */}
      </div>
      {/* End .page-header */}
      <nav aria-label="breadcrumb" className="breadcrumb-nav">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb-item">
              <a href="#">Shop</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Wishlist
            </li>
          </ol>
        </div>
        {/* End .container */}
      </nav>
      {/* End .breadcrumb-nav */}
      <div className="page-content">
        <div className="container">
          <table className="table table-wishlist table-mobile">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Stock Status</th>
                <th />
                <th />
              </tr>
            </thead>
            <tbody>
            {wishlistItems.map((item) => (
              <tr>
                <td className="product-col">
                  <div className="product">
                    <figure className="product-media">
                      <a href="#">
                        <img
                                src={`http://localhost:8384/api/sliders/image/${item.image}`}
                                alt="Product image"
                        />
                      </a>
                    </figure>
                    <h3 className="product-title">
                      <a href="#">{item.product.title}</a>
                    </h3>
                    {/* End .product-title */}
                  </div>
                  {/* End .product */}
                </td>
                <td className="price-col">${item.product.price}</td>
                <td className="stock-col">
                  <span className="in-stock">In stock</span>
                </td>
                <td className="action-col">
                  <button className="btn btn-block btn-outline-primary-2">
                    <i className="icon-cart-plus" />
                    Add to Cart
                  </button>
                </td>
                <td className="remove-col">
                  <button className="btn-remove"
                  onClick={() => removeItem(item.product.id)}
                  >
                    <i className="icon-close" />
                  </button>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
          {/* End .table table-wishlist */}
          <div className="wishlist-share">
            <div className="social-icons social-icons-sm mb-2">
              <label className="social-label">Share on:</label>
              <a
                href="#"
                className="social-icon"
                title="Facebook"
                target="_blank"
              >
                <i className="icon-facebook-f" />
              </a>
              <a
                href="#"
                className="social-icon"
                title="Twitter"
                target="_blank"
              >
                <i className="icon-twitter" />
              </a>
              <a
                href="#"
                className="social-icon"
                title="Instagram"
                target="_blank"
              >
                <i className="icon-instagram" />
              </a>
              <a
                href="#"
                className="social-icon"
                title="Youtube"
                target="_blank"
              >
                <i className="icon-youtube" />
              </a>
              <a
                href="#"
                className="social-icon"
                title="Pinterest"
                target="_blank"
              >
                <i className="icon-pinterest" />
              </a>
              
            </div>
            <div className="more-container text-center mt-2">
            <a href="/cart" className="btn btn-outline-darker btn-more">
              <span>Vào giỏ hàng</span>
              <i className="icon-long-arrow-right" />
            </a>
          </div>
            {/* End .soial-icons */}
          </div>
          {/* End .wishlist-share */}
        </div>
        {/* End .container */}
      </div>
      {/* End .page-content */}
    </main>
    {/* End .main */}
  </div>
  {/* End .page-wrapper */}
  <button id="scroll-top" title="Back to Top">
    <i className="icon-arrow-up" />
  </button>
</>

    );
}

export default Wishlist;