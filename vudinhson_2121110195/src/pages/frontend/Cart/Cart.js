import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import CartService from "../../../services/CartService";
function Cart() {
  document.title="Cart";
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [selectedShippingMethod, setSelectedShippingMethod] = useState(null);


  useEffect(() => {
    CartService.getCartItems()
      .then((response) => {
        setCartItems(response.data);
        calculateTotal(response.data); 
      })
      .catch((error) => {
        console.error('Error fetching cart items:', error);
      });
  }, []);

  const getImgUrl = (imageName) => {
    const endpoint = 'productimages'; 
    return `http://localhost:8384/api/${endpoint}/image/${imageName}`;
  };
  
  const removeItem = (productId) => {
    
    CartService.removeFromCart(productId)
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
            setCartItems((prevCartItems) => prevCartItems.filter(item => item.product.id !== productId));
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
  const calculateTotal = (items) => {
    const total = items.reduce((accumulator, item) => {
      return accumulator + item.product.price * item.quantity;
    }, 0);
    setTotalAmount(total);
  };
  const handleChangeQuantity = (productId, newQuantity) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.product.id === productId) {
        return { ...item, quantity: parseInt(newQuantity, 10) };
      }
      return item;
    });
  
    setCartItems(updatedCartItems);
    calculateTotal(updatedCartItems);
  
    CartService.updateCartItemQuantity(productId, newQuantity)
      .then((response) => {
        console.log("xong")
      })
      .catch((error) => {
        console.error('Error updating quantity on the server:', error);
      });
  };
  

  const handleFreeShippingChange = () => {
    setSelectedShippingMethod('Free Shipping');
    setShippingCost(0);
  };
  
  const handleStandardShippingChange = () => {
    setSelectedShippingMethod('Standard');
    setShippingCost(10);
  };
  
  const handleExpressShippingChange = () => {
    setSelectedShippingMethod('Express');
    setShippingCost(20);
  };
  const navigate = useNavigate();
const handleProceedToCheckout = () => {
  if (selectedShippingMethod) {
    navigate('/checkout', { state: { shippingMethod: selectedShippingMethod,shippingCost: shippingCost } });
  } else {
    Swal.fire({
      icon: 'warning',
      title: 'Please select a shipping method before proceeding to checkout.'
    });
  }
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
            Shopping Cart<span>Shop</span>
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
              Shopping Cart
            </li>
          </ol>
        </div>
        {/* End .container */}
      </nav>
      {/* End .breadcrumb-nav */}
      <div className="page-content">
        <div className="cart">
          <div className="container">
            <div className="row">
              <div className="col-lg-9">
                <table className="table table-cart table-mobile">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id}>
                      <td className="product-col">
                        <div className="product">
                          <figure className="product-media">
                            <a href="#">
                              <img
                                src={getImgUrl(item.image)}
                                alt="Product image"
                              />
                            </a>
                          </figure>
                          <h3 className="product-title">
                            <Link to={`/productdetail/${item.product.id}`}>{item.product.title}</Link>
                          </h3>
                          {/* End .product-title */}
                        </div>
                        {/* End .product */}
                      </td>
                      <td className="price-col">${item.product.price}</td>
                      <td className="quantity-col">
                        <div className="cart-product-quantity">
                          <input
                            type="number"
                            className="form-control"
                            defaultValue={item.quantity}
                            min={1}
                            max={10}
                            step={1}
                            data-decimals={0}
                            required=""
                            onChange={(e) => handleChangeQuantity(item.product.id, e.target.value)}
                          />
                        </div>
                        {/* End .cart-product-quantity */}
                      </td>
                      <td className="total-col">${item.product.price * item.quantity}</td>
                      <td className="remove-col">
                        <button className="btn-remove"
                        onClick={() => removeItem(item.product.id)}>
                          <i className="icon-close" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  </tbody>
                </table>
                {/* End .table table-wishlist */}
                <div className="cart-bottom">
                  <div className="cart-discount">
                    <form action="#">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          required=""
                          placeholder="coupon code"
                        />
                        <div className="input-group-append">
                          <button
                            className="btn btn-outline-primary-2"
                            type="submit"
                          >
                            <i className="icon-long-arrow-right" />
                          </button>
                        </div>
                        {/* .End .input-group-append */}
                      </div>
                      {/* End .input-group */}
                    </form>
                  </div>
                  {/* End .cart-discount */}
                  <a  className="btn btn-outline-dark-2"
                  onClick={() => window.location.reload()}>
                    <span>UPDATE CART</span>
                    <i className="icon-refresh" />
                  </a>
                </div>
                {/* End .cart-bottom */}
              </div>
              {/* End .col-lg-9 */}
              <aside className="col-lg-3">
                <div className="summary summary-cart">
                  <h3 className="summary-title">Cart Total</h3>
                  {/* End .summary-title */}
                  <table className="table table-summary">
                    <tbody>
                      <tr className="summary-subtotal">
                        <td>Subtotal:</td>
                        <td>${totalAmount.toFixed(1)}</td>
                      </tr>
                      {/* End .summary-subtotal */}
                      <tr className="summary-shipping">
                        <td>Shipping:</td>
                        <td>&nbsp;</td>
                      </tr>
                      <tr className="summary-shipping-row">
                        <td>
                          <div className="custom-control custom-radio">
                            <input
                              type="radio"
                              id="free-shipping"
                              name="shipping"
                              className="custom-control-input"
                              onChange={handleFreeShippingChange}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="free-shipping"
                            >
                              Free Shipping
                            </label>
                          </div>
                          {/* End .custom-control */}
                        </td>
                        <td>$0.00</td>
                      </tr>
                      {/* End .summary-shipping-row */}
                      <tr className="summary-shipping-row">
                        <td>
                          <div className="custom-control custom-radio">
                            <input
                              type="radio"
                              id="standart-shipping"
                              name="shipping"
                              className="custom-control-input"
                              onChange={handleStandardShippingChange}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="standart-shipping"
                            >
                              Standart:
                            </label>
                          </div>
                          {/* End .custom-control */}
                        </td>
                        <td>$10.00</td>
                      </tr>
                      {/* End .summary-shipping-row */}
                      <tr className="summary-shipping-row">
                        <td>
                          <div className="custom-control custom-radio">
                            <input
                              type="radio"
                              id="express-shipping"
                              name="shipping"
                              className="custom-control-input"
                              onChange={handleExpressShippingChange}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="express-shipping"
                            >
                              Express:
                            </label>
                          </div>
                          {/* End .custom-control */}
                        </td>
                        <td>$20.00</td>
                      </tr>
                      {/* End .summary-shipping-row */}
                      <tr className="summary-shipping-estimate">
                        <td>
                          Estimate for Your Country
                          <br /> <a href="dashboard.html">Change address</a>
                        </td>
                        <td>&nbsp;</td>
                      </tr>
                      {/* End .summary-shipping-estimate */}
                      <tr className="summary-total">
                        <td>Total:</td>
                        <td>${(totalAmount + shippingCost).toFixed(1)}</td>
                      </tr>
                      {/* End .summary-total */}
                    </tbody>
                  </table>
                  {/* End .table table-summary */}
                  <a
                
                    onClick={handleProceedToCheckout}
                    className="btn btn-outline-primary-2 btn-order btn-block"
                  >
                    PROCEED TO CHECKOUT
                  </a>
                </div>
                {/* End .summary */}
                <a
                  href="/"
                  className="btn btn-outline-dark-2 btn-block mb-3"
                >
                  <span>CONTINUE SHOPPING</span>
                  <i className="icon-refresh" />
                </a>
              </aside>
              {/* End .col-lg-3 */}
            </div>
            {/* End .row */}
          </div>
          {/* End .container */}
        </div>
        {/* End .cart */}
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

export default Cart;