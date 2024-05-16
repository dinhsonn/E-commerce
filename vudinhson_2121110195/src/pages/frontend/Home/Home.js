import Slider from "./Slider";
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ProductServices from '../../../services/ProductServices';
import Blog from "./Blog";
import ProductItem from "../Product/ProductItem";
import ProductNew from "../Product/ProductNew";
import ProductSale from "../Product/ProductSale";
function Home() {
  document.title="Home"
  const [products, setProducts] = useState([]);
  const [productImages, setProductImages] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsResponse, productImagesResponse] = await Promise.all([
          ProductServices.getAll(),
          ProductServices.getProductImage(),
        ]);

        const productsData = productsResponse.data.content;
        const productImagesData = productImagesResponse.data.content;
        setProducts(productsData);
        setProductImages(productImagesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const sortedProducts = products.sort((a, b) => b.id - a.id);

  const top10Products = sortedProducts.slice(0, 10);
  const combinedData = top10Products.map(product => {
    const correspondingImages = productImages.filter(image => image.productId.id === product.id && image.isPrimary === 1);
    const correspondingImages2 = productImages.filter(image => image.productId.id === product.id && image.isPrimary === 2);

    const imageUrls = correspondingImages.map(image => image.image);
    const image2Urls = correspondingImages2.map(image => image.image);
    return {
      ...product,
      image: imageUrls.length > 0 ? imageUrls[0] : null,
      image2: image2Urls.length > 0 ? image2Urls[0] : null,
    };
  });

    return ( 
<>
<Slider/>
  <div className="page-wrapper">
    <main className="main">
      {/* End .intro-slider-container */}
      <div
        className="brands-border owl-carousel owl-simple"
        data-toggle="owl"
        data-owl-options='{
              "nav": false, 
              "dots": false,
              "margin": 0,
              "loop": false,
              "responsive": {
                  "0": {
                      "items":2
                  },
                  "420": {
                      "items":3
                  },
                  "600": {
                      "items":4
                  },
                  "900": {
                      "items":5
                  },
                  "1024": {
                      "items":6
                  },
                  "1360": {
                      "items":7
                  }
              }
          }'
      >
      </div>
      {/* End .owl-carousel */}
      <div className="mb-3 mb-lg-5" />
      {/* End .mb-3 mb-lg-5 */}
      <div className="banner-group">
        {/* End .container */}
      </div>
      {/* End .banner-group */}
      <div className="mb-3" />
      {/* End .mb-6 */}

      {/* End .container-fluid */}
      <div className="mb-5" />
      {/* End .mb-5 */}
 
      {/* End .bg-light */}
      <div className="mb-6" />
      {/* End .mb-6 */}
      <div className="container">
        <div className="heading heading-center mb-3">
          <h2 className="title">Products</h2>
          {/* End .title */}
          <ul
            className="nav nav-pills nav-border-anim justify-content-center"
            role="tablist"
          >
            <li className="nav-item">
              <a
                className="nav-link active"
                id="top-all-link"
                data-toggle="tab"
                href="#top-all-tab"
                role="tab"
                aria-controls="top-all-tab"
                aria-selected="true"
              >
                 New
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="top-fur-link"
                data-toggle="tab"
                href="#top-fur-tab"
                role="tab"
                aria-controls="top-fur-tab"
                aria-selected="false"
              >
                Sale
              </a>
            </li>
          </ul>
        </div>
        {/* End .heading */}
        <div className="tab-content">
          <div
            className="tab-pane p-0 fade show active"
            id="top-all-tab"
            role="tabpanel"
            aria-labelledby="top-all-link"
          >
            <div className="products">
              <div className="row justify-content-left">
          {combinedData.map((combinedItem, index) => (
            <ProductNew product={combinedItem} key={index} />
          ))}

              </div>
              {/* End .row */}
            </div>
            {/* End .products */}
          </div>
          {/* .End .tab-pane */}
          <div
            className="tab-pane p-0 fade"
            id="top-fur-tab"
            role="tabpanel"
            aria-labelledby="top-fur-link"
          >
         <ProductSale/>
            {/* End .products */}
          </div>
          {/* .End .tab-pane */}
          <div
            className="tab-pane p-0 fade"
            id="top-decor-tab"
            role="tabpanel"
            aria-labelledby="top-decor-link"
          >
     
            {/* End .products */}
          </div>
          {/* .End .tab-pane */}
          <div
            className="tab-pane p-0 fade"
            id="top-light-tab"
            role="tabpanel"
            aria-labelledby="top-light-link"
          >
 
            {/* End .products */}
          </div>
          {/* .End .tab-pane */}
        </div>
        {/* End .tab-content */}
      </div>
      <div className="container">
        <hr className="mt-1 mb-6" />
      </div>
      <Blog/>
    </main>
  </div>
  <button id="scroll-top" title="Back to Top">
    <i className="icon-arrow-up" />
  </button>
  {/* Mobile Menu */}
  <div className="mobile-menu-overlay" />
  {/* End .mobil-menu-overlay */}
  <div className="mobile-menu-container mobile-menu-light">
    <div className="mobile-menu-wrapper">
      <span className="mobile-menu-close">
        <i className="icon-close" />
      </span>
      <form action="#" method="get" className="mobile-search">
        <label htmlFor="mobile-search" className="sr-only">
          Search
        </label>
        <input
          type="search"
          className="form-control"
          name="mobile-search"
          id="mobile-search"
          placeholder="Search product ..."
          required=""
        />
        <button className="btn btn-primary" type="submit">
          <i className="icon-search" />
        </button>
      </form>
      <ul className="nav nav-pills-mobile nav-border-anim" role="tablist">
        <li className="nav-item">
          <a
            className="nav-link active"
            id="mobile-menu-link"
            data-toggle="tab"
            href="#mobile-menu-tab"
            role="tab"
            aria-controls="mobile-menu-tab"
            aria-selected="true"
          >
            Menu
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            id="mobile-cats-link"
            data-toggle="tab"
            href="#mobile-cats-tab"
            role="tab"
            aria-controls="mobile-cats-tab"
            aria-selected="false"
          >
            Categories
          </a>
        </li>
      </ul>

      {/* End .tab-content */}
      <div className="social-icons">
        <a href="#" className="social-icon" target="_blank" title="Facebook">
          <i className="icon-facebook-f" />
        </a>
        <a href="#" className="social-icon" target="_blank" title="Twitter">
          <i className="icon-twitter" />
        </a>
        <a href="#" className="social-icon" target="_blank" title="Instagram">
          <i className="icon-instagram" />
        </a>
        <a href="#" className="social-icon" target="_blank" title="Youtube">
          <i className="icon-youtube" />
        </a>
      </div>
      {/* End .social-icons */}
    </div>
    {/* End .mobile-menu-wrapper */}
  </div>

  <div
    className="container newsletter-popup-container mfp-hide"
    // id="newsletter-popup-form"
  >
    <div className="row justify-content-center">
      <div className="col-10">
        <div className="row no-gutters bg-white newsletter-popup-content">
          <div className="col-xl-3-5col col-lg-7 banner-content-wrap">
            <div className="banner-content text-center">
              <img
                src="assets/images/popup/newsletter/logo.png"
                className="logo"
                alt="logo"
                width={60}
                height={15}
              />
              <h2 className="banner-title">
                get{" "}
                <span>
                  25<light>%</light>
                </span>{" "}
                off
              </h2>
              <p>
                Subscribe to the Molla eCommerce newsletter to receive timely
                updates from your favorite products.
              </p>
              <form action="#">
                <div className="input-group input-group-round">
                  <input
                    type="email"
                    className="form-control form-control-white"
                    placeholder="Your Email Address"
                    aria-label="Email Adress"
                    required=""
                  />
                  <div className="input-group-append">
                    <button className="btn" type="submit">
                      <span>go</span>
                    </button>
                  </div>
                  {/* .End .input-group-append */}
                </div>
                {/* .End .input-group */}
              </form>
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="register-policy-2"
                  required=""
                />
                <label
                  className="custom-control-label"
                  htmlFor="register-policy-2"
                >
                  Do not show this popup again
                </label>
              </div>
              {/* End .custom-checkbox */}
            </div>
          </div>
          <div className="col-xl-2-5col col-lg-5 ">
            <img
              src="assets/images/popup/newsletter/img-1.jpg"
              className="newsletter-img"
              alt="newsletter"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</>


     );
}

export default Home;