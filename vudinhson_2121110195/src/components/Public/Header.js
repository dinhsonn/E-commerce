  import { useEffect, useState } from "react";
  import Category from "./Category";
  import Login from "../../layouts/LayoutSite/Login";
  import Menu from "./Menu";
  import Swal from 'sweetalert2';
  import CartHeader from "./CartHeader";
  import WishlistService from "../../services/WishlistService";
  import CartService from "../../services/CartService";
  import './Header.css';
  import { VscAccount } from 'react-icons/vsc';


  function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [wishlistItemCount, setWishlistItemCount] = useState(0);
    const [cartItemCount, setCartItemCount] = useState(0);

    const handleLoginSuccess = () => {
      setIsLoggedIn(true);
    };
    const handleLogout = () => { 
          localStorage.removeItem('loggedInUser');
          setIsLoggedIn(false);
          window.location.href = '/'; 

    };
    useEffect(() => {
      const storedUser = localStorage.getItem('loggedInUser');
    
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setIsLoggedIn(true);
      }
    }, []);
    //
    useEffect(() => {
      
      updateWishlistItemCount(); 
    }, []);
    const updateWishlistItemCount = () => {
      WishlistService.getWishlistItems()
        .then((response) => {
          setWishlistItemCount(response.data.length);
        })
        .catch((error) => {
          console.error('Error fetching wishlist items:', error);
        });
    };
    //
    useEffect(() => {
      updateCartItemCount(); 
    }, []);
    const updateCartItemCount = () => {
      CartService.getCartItems()
        .then((response) => {
          setCartItemCount(response.data.length);
        })
        .catch((error) => {
          console.error('Error fetching wishlist items:', error);
        });
    };
    
      return (  
        <header className="header header-2 header-intro-clearance">
          <Login onLoginSuccess={handleLoginSuccess}/>
        <div className="header-top">
          <div className="container">
            <div className="header-left">
            <span>Telephone Enquiry:</span>
                    <a href="#">(+123) 123 321 345</a>
            </div>
            {/* End .header-left */}
            {/* End .header-right */}
          </div>
          {/* End .container */}
        </div>
        {/* End .header-top */}
        <div className="header-middle">
          <div className="container">
            <div className="header-left">
              <button className="mobile-menu-toggler">
                <span className="sr-only">Toggle mobile menu</span>
                <i className="icon-bars" />
              </button>
              <a href="/" className="logo">
                <img
                  src="assets/images/demos/demo-2/logo.png"
                  alt="Molla Logo"
                  width={105}
                  height={25}
                />
              </a>
            </div>
            {/* End .header-left */}
            <div className="header-center">
              <div className="header-search header-search-extended header-search-visible header-search-no-radius d-none d-lg-block">
                <a href="#" className="search-toggle" role="button">
                  <i className="icon-search" />
                </a>
                <form action="#" method="get">
                  <div className="header-search-wrapper search-wrapper-wide">
                    <label htmlFor="q" className="sr-only">
                      Search
                    </label>
                    <input
                      type="search"
                      className="form-control"
                      name="q"
                      id="q"
                      placeholder="Search product ..."
                      required=""
                    />
                    <button className="btn btn-primary" type="submit">
                      <i className="icon-search" />
                    </button>
                  </div>
                  {/* End .header-search-wrapper */}
                </form>
              </div>
              {/* End .header-search */}
            </div>
            <div className="header-right">
              {/* End .compare-dropdown */}
              <div className="wishlist">
                <a href="/wishlist" title="Wishlist">
                  <div className="icon">
                    <i className="icon-heart-o" />
                    <span className="wishlist-count badge">{wishlistItemCount}</span>
                  </div>
                  <p>Yêu thích</p>
                </a>
              </div>
              {/* End .compare-dropdown */}
              <div className="dropdown cart-dropdown">
                <a
                  href="/cart"
                  className="dropdown-toggle"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  data-display="static"
                >
                  <div className="icon">
                    <i  className="icon-shopping-cart" />
                    <span className="cart-count">{cartItemCount}</span>
                  </div>
                  <p>Giỏ hàng</p>
                </a>
        <CartHeader/>
                {/* End .dropdown-menu */}
              </div>
              <div className="dropdown cart-dropdown" >
              {isLoggedIn ? (
                <div className="user-dropdown">
                  <div className='icons-and-text'>
                  <div className="icon-user" >
                  </div>
                  <ul className="dropdown-menu">
                    <li>
                      <a href="/profile">Thông tin tài khoản</a>
                    </li>
                    <li>
                      <a href="#" onClick={handleLogout}>Đăng xuất</a>
                    </li>
                  </ul>
                  </div>
                </div>
              ) : (
                <a href="#signin-modal" data-toggle="modal" title="Đăng nhập / Đăng ký" >
                  <p>Đăng nhập / Đăng ký</p>
                </a>
              )}
            </div>

              {/* End .cart-dropdown */}
            </div>
            {/* End .header-right */}
          </div>
          {/* End .container */}
        </div>
        {/* End .header-middle */}
        <div className="header-bottom sticky-header">
          <div className="container">
            <div className="header-left">
                <Category/>
              {/* End .category-dropdown */}
            </div>
            {/* End .header-left */}
            <Menu/>
          </div>
          {/* End .container */}
        </div>
        {/* End .header-bottom */}
      </header>
      
      );
  }

  export default Header;