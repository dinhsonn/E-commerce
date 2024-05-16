import Swal from "sweetalert2";
import CartService from "../../services/CartService";
import React, { useContext, useEffect, useState } from "react";
function CartHeader() {
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
  
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
  
      setCartItems(updatedCartItems); // Cập nhật giỏ hàng với số lượng mới
  
      calculateTotal(updatedCartItems); 
    };
    const Totalprice = (items) => {
      const total = items.reduce((accumulator, item) => {
        return accumulator + item.product.price * item.quantity;
      }, 0);
      setTotalAmount(total);
    };
    return ( 
        <div className="dropdown-menu dropdown-menu-right">
        <div className="dropdown-cart-products">
        {cartItems.map((item) => (
          <div className="product">
            <div className="product-cart-details">
              <h4 className="product-title">
                <a href="product.html">
                {item.product.title}
                </a>
              </h4>
              <span className="cart-product-info">
                <span className="cart-product-qty">{item.quantity}</span>x ${item.product.price * item.quantity}
              </span>
            </div>
            <figure className="product-image-container">
              <a href="product.html" className="product-image">
                <img
                    src={getImgUrl(item.image)}
                  alt="product"
                />
              </a>
            </figure>
            <a href="#" className="btn-remove" title="Remove Product" onClick={() => removeItem(item.product.id)}>
              <i className="icon-close" />
            </a>
          </div>
        ))}
          {/* End .product */}
        </div>
        {/* End .cart-product */}
        <div className="dropdown-cart-total">
          <span>Tổng tiền</span>
          <span className="cart-total-price">${totalAmount.toFixed(1)}</span>
        </div>
        {/* End .dropdown-cart-total */}
        <div className="dropdown-cart-action" style={{paddingLeft:'140px'}}>
          <a href="/cart" className="btn btn-primary">
            Giỏ hàng
          </a>
       
        </div>
        {/* End .dropdown-cart-total */}
      </div>
     );
}

export default CartHeader;