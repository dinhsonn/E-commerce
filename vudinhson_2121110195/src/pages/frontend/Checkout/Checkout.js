import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useUser } from "../../../services/UserContext";
import CheckoutService from "../../../services/CheckoutService";
import Swal from "sweetalert2";
import CartService from "../../../services/CartService";
import Header from "../../../components/Public/Header";
import { useNavigate } from "react-router-dom";

function Checkout() {
  document.title="Checkout";
  const location = useLocation();
  const { shippingMethod, shippingCost } = location.state || {};
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const { loggedInUser } = useUser();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [checkouts, setCheckouts] = useState(null);
  console.log('LoggedInUser:', loggedInUser);
  const navigate = useNavigate(); // Sử dụng hook useNavigate để điều hướng

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
  const calculateTotal = (items) => {
    const total = items.reduce((accumulator, item) => {
      return accumulator + item.product.price * item.quantity;
    }, 0);
    setTotalAmount(total);
  };
  ////
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };
  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };
  const handleCheckout = async (event) => {
    event.preventDefault();

    try {
      if (loggedInUser) {

      const response = await CheckoutService.order({
        userId: loggedInUser,
        name: name,
        email: email,
        phone: phone,
        address: address,  
        note: note,
        createdAt: "2023-12-30T07:54:31.000+00:00",
        updatedAt: null,
        createdBy: 1,
        updatedBy: null,
        status: 1,
      });
      const orderId = response.data;
      const productsInfo = cartItems.map((item) => {
        return {
          id: item.id,      
          product: {
            id: item.product.id,
            title: item.product.title,
            slug: item.product.slug,
            price: item.product.price,
            qty: item.product.qty,
            description: item.product.description,
            category: {
              id: item.product.category.id,
              name: item.product.category.name,
              slug: item.product.category.slug,
              image: item.product.category.image,
              parentId: item.product.category.parentId,
              sortOrder: item.product.category.sortOrder,
              metakey: item.product.category.metakey,
              metadesc: item.product.category.metadesc,
              createdAt: item.product.category.createdAt,
              updatedAt: item.product.category.updatedAt,
              createdBy: item.product.category.createdBy,
              updatedBy: item.product.category.updatedBy,
              status: item.product.category.status,
             
            },
            brandId: {
              id: item.product.brandId.id,
              name: item.product.brandId.name,
              slug: item.product.brandId.slug,
              image: item.product.category.image,
              sortOrder: item.product.category.sortOrder,
              metakey: item.product.category.metakey,
              metadesc: item.product.category.metadesc,
              createdAt: item.product.category.createdAt,
              updatedAt: item.product.category.updatedAt,
              createdBy: item.product.category.createdBy,
              updatedBy: item.product.category.updatedBy,
              status: item.product.category.status,
            },
            metakey: item.product.metakey,
            metadesc: item.product.metadesc,
            createdAt: item.product.createdAt,
            updatedAt: item.product.updatedAt,
            createdBy: item.product.createdBy,
            updatedBy: item.product.updatedBy,
            status: item.product.status,
          },
          quantity: item.quantity,
          image: item.image,
        };
      });
      console.log(productsInfo)
      console.log(orderId)
      const productResponse = await CheckoutService.orderdetail({
        orderId: orderId,
        cartItems: productsInfo, 
        price: totalAmount,
        qty: "",
        amount: totalAmount,
      });
      console.log("aaa",productResponse)
      setCheckouts(response);
      Swal.fire(
        'Checkout Successfully!',
        'You have successfully checkout your account!',
        'success'
      )
      console.log('Registration successful', response);
    } else {
      console.error('User not logged in');
    }
    } catch (error) {
      Swal.fire(
        'Checkout Successfully!',
        'You have successfully checkout your account!',
        'success'
      )
      navigate("/");
    }
  };
    return ( 
        <>
        <Header />
  <div className="page-wrapper">
    <main className="main">
      <div
        className="page-header text-center"
        style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}
      >
        <div className="container">
          <h1 className="page-title">
            Checkout<span>Shop</span>
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
              Checkout
            </li>
          </ol>
        </div>
        {/* End .container */}
      </nav>
      {/* End .breadcrumb-nav */}
      <div className="page-content">
        <div className="checkout">
          <div className="container">
            <div className="checkout-discount">
              <form action="#">
                <input
                  type="text"
                  className="form-control"
                  required=""
                  id="checkout-discount-input"
                />
                <label
                  htmlFor="checkout-discount-input"
                  className="text-truncate"
                >
                  Have a coupon? <span>Click here to enter your code</span>
                </label>
              </form>
            </div>
            {/* End .checkout-discount */}
            <form action="#" onSubmit={handleCheckout}>
              <div className="row">
                <div className="col-lg-9">
                  <h2 className="checkout-title">Billing Details</h2>
                  {/* End .checkout-title */}
                  <div className="row">
                    <div className="col-sm-6">
                      <label>Name *</label>
                      <input type="text" onChange={handleNameChange} className="form-control" required="" />
                    </div>
                    {/* End .col-sm-6 */}
                    <div className="col-sm-6">
                      <label>Phone *</label>
                      <input type="text" onChange={handlePhoneChange} className="form-control" required="" />
                    </div>
                    {/* End .col-sm-6 */}
                  </div>
   
                  <label>Address *</label>
                  <input type="text" onChange={handleAddressChange} className="form-control" required="" />
            
      
                  {/* End .row */}
                  <div className="row">
             
                  </div>
                  {/* End .row */}
                  <label>Email address *</label>
                  <input type="email" onChange={handleEmailChange} className="form-control" required="" />
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="checkout-create-acc"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="checkout-create-acc"
                    >
                      Create an account?
                    </label>
                  </div>
                  {/* End .custom-checkbox */}
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="checkout-diff-address"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="checkout-diff-address"
                    >
                      Ship to a different address?
                    </label>
                  </div>
                  {/* End .custom-checkbox */}
                  <label>Order notes (optional)</label>
                  <textarea
                    className="form-control"
                    cols={30}
                    rows={4}
                    onChange={handleNoteChange}
                    placeholder="Notes about your order, e.g. special notes for delivery"
                    defaultValue={""}
                  />
                </div>
                {/* End .col-lg-9 */}
                <aside className="col-lg-3">
                  <div className="summary">
                    <h3 className="summary-title">Your Order</h3>
                    {/* End .summary-title */}
                    <table className="table table-summary">
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                      {cartItems.map((item) => (
                        <tr>
                          <td>
                            <a href="#">{item.product.title}</a>
                          </td>
                          <td>{item.quantity}-${item.product.price}</td>
                        </tr>
                      ))}
                        <tr className="summary-subtotal">
                          <td>Subtotal:</td>
                          <td>${totalAmount.toFixed(1)}</td>
                        </tr>
                        {/* End .summary-subtotal */}
                        <tr>
                          <td>Shipping:</td>
                          <td>{shippingMethod}({shippingCost}$)</td>
                        </tr>
                        <tr className="summary-total">
                          <td>Total:</td>
                          <td>${(totalAmount + shippingCost).toFixed(1)}</td>
                        </tr>
                        {/* End .summary-total */}
                      </tbody>
                    </table>
                    {/* End .table table-summary */}
                    <div className="accordion-summary" id="accordion-payment">
                      <div className="card">
                        <div className="card-header" id="heading-1">
                          <h2 className="card-title">
                            <a
                              role="button"
                              data-toggle="collapse"
                              href="#collapse-1"
                              aria-expanded="true"
                              aria-controls="collapse-1"
                            >
                              Direct bank transfer
                            </a>
                          </h2>
                        </div>
                        {/* End .card-header */}
                        <div
                          id="collapse-1"
                          className="collapse show"
                          aria-labelledby="heading-1"
                          data-parent="#accordion-payment"
                        >
                          <div className="card-body">
                            Make your payment directly into our bank account.
                            Please use your Order ID as the payment reference.
                            Your order will not be shipped until the funds have
                            cleared in our account.
                          </div>
                          {/* End .card-body */}
                        </div>
                        {/* End .collapse */}
                      </div>
                      {/* End .card */}
                      <div className="card">
                        <div className="card-header" id="heading-2">
                          <h2 className="card-title">
                            <a
                              className="collapsed"
                              role="button"
                              data-toggle="collapse"
                              href="#collapse-2"
                              aria-expanded="false"
                              aria-controls="collapse-2"
                            >
                              Check payments
                            </a>
                          </h2>
                        </div>
                        {/* End .card-header */}
                        <div
                          id="collapse-2"
                          className="collapse"
                          aria-labelledby="heading-2"
                          data-parent="#accordion-payment"
                        >
                          <div className="card-body">
                            Ipsum dolor sit amet, consectetuer adipiscing elit.
                            Donec odio. Quisque volutpat mattis eros. Nullam
                            malesuada erat ut turpis.
                          </div>
                          {/* End .card-body */}
                        </div>
                        {/* End .collapse */}
                      </div>
                      {/* End .card */}
                      <div className="card">
                        <div className="card-header" id="heading-3">
                          <h2 className="card-title">
                            <a
                              className="collapsed"
                              role="button"
                              data-toggle="collapse"
                              href="#collapse-3"
                              aria-expanded="false"
                              aria-controls="collapse-3"
                            >
                              Cash on delivery
                            </a>
                          </h2>
                        </div>
                        {/* End .card-header */}
                        <div
                          id="collapse-3"
                          className="collapse"
                          aria-labelledby="heading-3"
                          data-parent="#accordion-payment"
                        >
                          <div className="card-body">
                            Quisque volutpat mattis eros. Lorem ipsum dolor sit
                            amet, consectetuer adipiscing elit. Donec odio.
                            Quisque volutpat mattis eros.
                          </div>
                          {/* End .card-body */}
                        </div>
                        {/* End .collapse */}
                      </div>
                      {/* End .card */}
                      <div className="card">
                        <div className="card-header" id="heading-4">
                          <h2 className="card-title">
                            <a
                              className="collapsed"
                              role="button"
                              data-toggle="collapse"
                              href="#collapse-4"
                              aria-expanded="false"
                              aria-controls="collapse-4"
                            >
                              PayPal{" "}
                              <small className="float-right paypal-link">
                                What is PayPal?
                              </small>
                            </a>
                          </h2>
                        </div>
                        {/* End .card-header */}
                        <div
                          id="collapse-4"
                          className="collapse"
                          aria-labelledby="heading-4"
                          data-parent="#accordion-payment"
                        >
                          <div className="card-body">
                            Nullam malesuada erat ut turpis. Suspendisse urna
                            nibh, viverra non, semper suscipit, posuere a, pede.
                            Donec nec justo eget felis facilisis fermentum.
                          </div>
                          {/* End .card-body */}
                        </div>
                        {/* End .collapse */}
                      </div>
                      {/* End .card */}
                      <div className="card">
                        <div className="card-header" id="heading-5">
                          <h2 className="card-title">
                            <a
                              className="collapsed"
                              role="button"
                              data-toggle="collapse"
                              href="#collapse-5"
                              aria-expanded="false"
                              aria-controls="collapse-5"
                            >
                              Credit Card (Stripe)
                              <img
                                src="assets/images/payments-summary.png"
                                alt="payments cards"
                              />
                            </a>
                          </h2>
                        </div>
                        {/* End .card-header */}
                        <div
                          id="collapse-5"
                          className="collapse"
                          aria-labelledby="heading-5"
                          data-parent="#accordion-payment"
                        >
                          <div className="card-body">
                            {" "}
                            Donec nec justo eget felis facilisis fermentum.Lorem
                            ipsum dolor sit amet, consectetuer adipiscing elit.
                            Donec odio. Quisque volutpat mattis eros. Lorem
                            ipsum dolor sit ame.
                          </div>
                          {/* End .card-body */}
                        </div>
                        {/* End .collapse */}
                      </div>
                      {/* End .card */}
                    </div>
                    {/* End .accordion */}
                    <button
                      type="submit"
                      className="btn btn-outline-primary-2 btn-order btn-block"
                    >
                      <span className="btn-text">Place Order</span>
                      <span className="btn-hover-text">
                        Proceed to Checkout
                      </span>
                    </button>
                  </div>
                  {/* End .summary */}
                </aside>
                {/* End .col-lg-3 */}
              </div>
              {/* End .row */}
            </form>
          </div>
          {/* End .container */}
        </div>
        {/* End .checkout */}
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

export default Checkout;