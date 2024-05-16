import React, { useEffect, useState } from 'react';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import ProductServices from '../../../services/ProductServices';
import Swal from 'sweetalert2';
import CartService from '../../../services/CartService';
import WishlistService from '../../../services/WishlistService';
import Header from '../../../components/Public/Header';
import Footer from '../../../components/Public/Footer';
function ProductDetail(props) {

  const [products, setProducts] = useState({});
  const [productImages, setProductImages] = useState([]);
  const { id } = useParams();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const image = queryParams.get('image');
  const [selectedImage, setSelectedImage] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
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
    console.log("Adding to cart:", products.id, quantity,image); 
    CartService.addToCart(products.id, quantity,image)
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

    console.log("Adding to wishlist:", products.id,image); 
    WishlistService.addToWishlist(products.id,image)
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
  useEffect(() => {
    ProductServices.getById(id)
      .then(response => {
        document.title = response.data.title;
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    ProductServices.getProductImageById(id)
      .then(response => {
        console.log("aaaaaa",response.data.content);
        setProductImages(response.data.content);
      })
      .catch(error => {
        console.error('Error fetching product images:', error);
      });
  }, [id]);
  if (!products) {
    return <p>Loading...</p>;
  }

  const getImgUrl = (imageName) => {
    const endpoint = 'productimages'; 
    return `http://localhost:8384/api/${endpoint}/image/${imageName}`;
  };
    return (  
        <>
        <Header />
  <div className="page-wrapper">
    <main className="main">
      <nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
        <div className="container d-flex align-items-center">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb-item">
              <a href="#">Products</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Default
            </li>
          </ol>
          <nav className="product-pager ml-auto" aria-label="Product">
            <a
              className="product-pager-link product-pager-prev"
              href="#"
              aria-label="Previous"
              tabIndex={-1}
            >
              <i className="icon-angle-left" />
              <span>Prev</span>
            </a>
            <a
              className="product-pager-link product-pager-next"
              href="#"
              aria-label="Next"
              tabIndex={-1}
            >
              <span>Next</span>
              <i className="icon-angle-right" />
            </a>
          </nav>
          {/* End .pager-nav */}
        </div>
        {/* End .container */}
      </nav>
      {/* End .breadcrumb-nav */}
      <div className="page-content">
        <div className="container">
          <div className="product-details-top">
            <div className="row">
              <div className="col-md-6">
                <div className="product-gallery product-gallery-vertical">
                  <div className="row">
                    <figure className="product-main-image">
                      <img
                        id="product-zoom"
                        src={selectedImage || getImgUrl(image)}
                        data-zoom-image="assets/images/products/single/1-big.jpg"
                        alt="product image"
                      />
                      <a
                        href="#"
                        id="btn-product-gallery"
                        className="btn-product-gallery"
                      >
                        <i className="icon-arrows" />
                      </a>
                    </figure>
                    {/* End .product-main-image */}
                    <div
                      id="product-zoom-gallery"
                      className="product-image-gallery"
                    >
                  {productImages.map((image, index) => (
                      <a
                        className="product-gallery-item "
                        href="#"
                        key={index}
                        data-image="assets/images/products/single/1.jpg"
                        data-zoom-image="assets/images/products/single/1-big.jpg"
                        onClick={() => setSelectedImage(getImgUrl(image.image))}
                      >
                        <img
                          src={getImgUrl(image.image)}
                          alt="product side"
                        />
                      </a>
                     ))}
                    </div>
                    {/* End .product-image-gallery */}
                  </div>
                  {/* End .row */}
                </div>
                {/* End .product-gallery */}
              </div>
              {/* End .col-md-6 */}
              <div className="col-md-6">
                <div className="product-details">
                  <h1 className="product-title">
                    {products.title}
                  </h1>
                  {/* End .product-title */}
                  <div className="ratings-container">
                    <div className="ratings">
                      <div className="ratings-val" style={{ width: "80%" }} />
                      {/* End .ratings-val */}
                    </div>
                    {/* End .ratings */}
                    <a
                      className="ratings-text"
                      href="#product-review-link"
                      id="review-link"
                    >
                      ( 2 Reviews )
                    </a>
                  </div>
                  {/* End .rating-container */}
                <div className="product-price">${products.price}</div>
                  {/* End .product-price */}
                  <div className="product-content">
                    <p>
                      {products.description}{" "}
                    </p>
                  </div>
                  {/* End .product-content */}
         
                  {/* End .details-filter-row */}
                  <div className="details-filter-row details-row-size">
                    <label htmlFor="size">Size:</label>
                    <div className="select-custom">
                      <select name="size" id="size" className="form-control">
                        <option value="#" selected="selected">
                          Select a size
                        </option>
                        <option value="s">Small</option>
                        <option value="m">Medium</option>
                        <option value="l">Large</option>
                        <option value="xl">Extra Large</option>
                      </select>
                    </div>
                    {/* End .select-custom */}
                    <a href="#" className="size-guide">
                      <i className="icon-th-list" />
                      size guide
                    </a>
                  </div>
                  {/* End .details-filter-row */}
                  <div className="details-filter-row details-row-size">
                    <label htmlFor="qty">Qty:</label>
                    <div className="product-details-quantity">
                      <input
                        type="number"
                        id="qty"
                        className="form-control"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                        min={1}
                        max={10}
                        step={1}
                        data-decimals={0}
                        required=""
                      />
                    </div>
                    {/* End .product-details-quantity */}
                  </div>
                  {/* End .details-filter-row */}
                  <div className="product-details-action">
                    <a href="#" onClick={handleAddToCart} className="btn-product btn-cart">
                      <span>add to cart</span>
                    </a>
                    <div className="details-action-wrapper">
                      <a
                        href="#"
                        onClick={handleAddToWishlist}
                        className="btn-product btn-wishlist"
                        title="Wishlist"
                      >
                        <span>Add to Wishlist</span>
                      </a>
                      <a
                        href="#"
                        className="btn-product btn-compare"
                        title="Compare"
                      >
                        <span>Add to Compare</span>
                      </a>
                    </div>
                    {/* End .details-action-wrapper */}
                  </div>
                  {/* End .product-details-action */}
                  <div className="product-details-footer">
                    <div className="product-cat">
                      <span>Category:</span>
                      <a href="#">Women</a>,<a href="#">Dresses</a>,
                      <a href="#">Yellow</a>
                    </div>
                    {/* End .product-cat */}
                    <div className="social-icons social-icons-sm">
                      <span className="social-label">Share:</span>
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
                        title="Pinterest"
                        target="_blank"
                      >
                        <i className="icon-pinterest" />
                      </a>
                    </div>
                  </div>
                  {/* End .product-details-footer */}
                </div>
                {/* End .product-details */}
              </div>
              {/* End .col-md-6 */}
            </div>
            {/* End .row */}
          </div>
          {/* End .product-details-top */}
          <div className="product-details-tab">
            <ul className="nav nav-pills justify-content-center" role="tablist">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  id="product-desc-link"
                  data-toggle="tab"
                  href="#product-desc-tab"
                  role="tab"
                  aria-controls="product-desc-tab"
                  aria-selected="true"
                >
                  Description
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  id="product-info-link"
                  data-toggle="tab"
                  href="#product-info-tab"
                  role="tab"
                  aria-controls="product-info-tab"
                  aria-selected="false"
                >
                  Additional information
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  id="product-shipping-link"
                  data-toggle="tab"
                  href="#product-shipping-tab"
                  role="tab"
                  aria-controls="product-shipping-tab"
                  aria-selected="false"
                >
                  Shipping &amp; Returns
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  id="product-review-link"
                  data-toggle="tab"
                  href="#product-review-tab"
                  role="tab"
                  aria-controls="product-review-tab"
                  aria-selected="false"
                >
                  Reviews (2)
                </a>
              </li>
            </ul>
            <div className="tab-content">
              <div
                className="tab-pane fade show active"
                id="product-desc-tab"
                role="tabpanel"
                aria-labelledby="product-desc-link"
              >
                <div className="product-desc-content">
                  <h3>Product Information</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                    Donec odio. Quisque volutpat mattis eros. Nullam malesuada
                    erat ut turpis. Suspendisse urna viverra non, semper
                    suscipit, posuere a, pede. Donec nec justo eget felis
                    facilisis fermentum. Aliquam porttitor mauris sit amet orci.
                    Aenean dignissim pellentesque felis. Phasellus ultrices
                    nulla quis nibh. Quisque a lectus. Donec consectetuer ligula
                    vulputate sem tristique cursus.{" "}
                  </p>
                  <ul>
                    <li>
                      Nunc nec porttitor turpis. In eu risus enim. In vitae
                      mollis elit.{" "}
                    </li>
                    <li>Vivamus finibus vel mauris ut vehicula.</li>
                    <li>
                      Nullam a magna porttitor, dictum risus nec, faucibus
                      sapien.
                    </li>
                  </ul>
                  <p>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                    Donec odio. Quisque volutpat mattis eros. Nullam malesuada
                    erat ut turpis. Suspendisse urna viverra non, semper
                    suscipit, posuere a, pede. Donec nec justo eget felis
                    facilisis fermentum. Aliquam porttitor mauris sit amet orci.
                    Aenean dignissim pellentesque felis. Phasellus ultrices
                    nulla quis nibh. Quisque a lectus. Donec consectetuer ligula
                    vulputate sem tristique cursus.{" "}
                  </p>
                </div>
                {/* End .product-desc-content */}
              </div>
              {/* .End .tab-pane */}
              <div
                className="tab-pane fade"
                id="product-info-tab"
                role="tabpanel"
                aria-labelledby="product-info-link"
              >
                <div className="product-desc-content">
                  <h3>Information</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                    Donec odio. Quisque volutpat mattis eros. Nullam malesuada
                    erat ut turpis. Suspendisse urna viverra non, semper
                    suscipit, posuere a, pede. Donec nec justo eget felis
                    facilisis fermentum. Aliquam porttitor mauris sit amet orci.{" "}
                  </p>
                  <h3>Fabric &amp; care</h3>
                  <ul>
                    <li>Faux suede fabric</li>
                    <li>Gold tone metal hoop handles.</li>
                    <li>RI branding</li>
                    <li>Snake print trim interior </li>
                    <li>Adjustable cross body strap</li>
                    <li>
                      {" "}
                      Height: 31cm; Width: 32cm; Depth: 12cm; Handle Drop: 61cm
                    </li>
                  </ul>
                  <h3>Size</h3>
                  <p>one size</p>
                </div>
                {/* End .product-desc-content */}
              </div>
              {/* .End .tab-pane */}
              <div
                className="tab-pane fade"
                id="product-shipping-tab"
                role="tabpanel"
                aria-labelledby="product-shipping-link"
              >
                <div className="product-desc-content">
                  <h3>Delivery &amp; returns</h3>
                  <p>
                    We deliver to over 100 countries around the world. For full
                    details of the delivery options we offer, please view our{" "}
                    <a href="#">Delivery information</a>
                    <br />
                    We hope you’ll love every purchase, but if you ever need to
                    return an item you can do so within a month of receipt. For
                    full details of how to make a return, please view our{" "}
                    <a href="#">Returns information</a>
                  </p>
                </div>
                {/* End .product-desc-content */}
              </div>
              {/* .End .tab-pane */}
              <div
                className="tab-pane fade"
                id="product-review-tab"
                role="tabpanel"
                aria-labelledby="product-review-link"
              >
                <div className="reviews">
                  <h3>Reviews (2)</h3>
                  <div className="review">
                    <div className="row no-gutters">
                      <div className="col-auto">
                        <h4>
                          <a href="#">Samanta J.</a>
                        </h4>
                        <div className="ratings-container">
                          <div className="ratings">
                            <div
                              className="ratings-val"
                              style={{ width: "80%" }}
                            />
                            {/* End .ratings-val */}
                          </div>
                          {/* End .ratings */}
                        </div>
                        {/* End .rating-container */}
                        <span className="review-date">6 days ago</span>
                      </div>
                      {/* End .col */}
                      <div className="col">
                        <h4>Good, perfect size</h4>
                        <div className="review-content">
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Ducimus cum dolores assumenda asperiores
                            facilis porro reprehenderit animi culpa atque
                            blanditiis commodi perspiciatis doloremque,
                            possimus, explicabo, autem fugit beatae quae
                            voluptas!
                          </p>
                        </div>
                        {/* End .review-content */}
                        <div className="review-action">
                          <a href="#">
                            <i className="icon-thumbs-up" />
                            Helpful (2)
                          </a>
                          <a href="#">
                            <i className="icon-thumbs-down" />
                            Unhelpful (0)
                          </a>
                        </div>
                        {/* End .review-action */}
                      </div>
                      {/* End .col-auto */}
                    </div>
                    {/* End .row */}
                  </div>
                  {/* End .review */}
                  <div className="review">
                    <div className="row no-gutters">
                      <div className="col-auto">
                        <h4>
                          <a href="#">John Doe</a>
                        </h4>
                        <div className="ratings-container">
                          <div className="ratings">
                            <div
                              className="ratings-val"
                              style={{ width: "100%" }}
                            />
                            {/* End .ratings-val */}
                          </div>
                          {/* End .ratings */}
                        </div>
                        {/* End .rating-container */}
                        <span className="review-date">5 days ago</span>
                      </div>
                      {/* End .col */}
                      <div className="col">
                        <h4>Very good</h4>
                        <div className="review-content">
                          <p>
                            Sed, molestias, tempore? Ex dolor esse iure hic
                            veniam laborum blanditiis laudantium iste amet. Cum
                            non voluptate eos enim, ab cumque nam, modi, quas
                            iure illum repellendus, blanditiis perspiciatis
                            beatae!
                          </p>
                        </div>
                        {/* End .review-content */}
                        <div className="review-action">
                          <a href="#">
                            <i className="icon-thumbs-up" />
                            Helpful (0)
                          </a>
                          <a href="#">
                            <i className="icon-thumbs-down" />
                            Unhelpful (0)
                          </a>
                        </div>
                        {/* End .review-action */}
                      </div>
                      {/* End .col-auto */}
                    </div>
                    {/* End .row */}
                  </div>
                  {/* End .review */}
                </div>
                {/* End .reviews */}
              </div>
              {/* .End .tab-pane */}
            </div>
            {/* End .tab-content */}
          </div>
          {/* End .product-details-tab */}
    
          {/* End .owl-carousel */}
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
  <>
  <div className="sticky-bar">
    <div className="container">
      <div className="row">
        <div className="col-6">
          <figure className="product-media">
            <a href="product.html">
              <img
                  src={getImgUrl(image)}
                alt="Product image"
              />
            </a>
          </figure>
          {/* End .product-media */}
          <h4 className="product-title">
            <a href="product.html">{products.title}</a>
          </h4>
          {/* End .product-title */}
        </div>
        {/* End .col-6 */}
        <div className="col-6 justify-content-end">
          <div className="product-price">${products.price}</div>
          {/* End .product-price */}
          <div className="product-details-quantity">
            <input
              type="number"
              id="sticky-cart-qty"
              className="form-control"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              min={1}
              max={10}
              step={1}
              data-decimals={0}
              required=""
            />
          </div>
          {/* End .product-details-quantity */}
          <div className="product-details-action">
            <a href="#" onClick={handleAddToCart} className="btn-product btn-cart">
              <span>add to cart</span>
            </a>
            <a href="#" className="btn-product btn-wishlist" title="Wishlist">
              <span>Add to Wishlist</span>
            </a>
          </div>
        </div>
        {/* End .col-6 */}
      </div>
      {/* End .row */}
    </div>
    {/* End .container */}
  </div>


</>
<Footer />
</>

    );
}

export default ProductDetail;