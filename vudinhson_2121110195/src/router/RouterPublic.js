import React, { Profiler } from 'react';
import { Routes, Route } from 'react-router-dom';
import Brand from "../pages/frontend/Brand/index.js";
import Cart from "../pages/frontend/Cart/Cart.js";
import Checkout from "../pages/frontend/Checkout/Checkout.js";
import Contact from "../pages/frontend/Contact/Contact.js";
import Post from "../pages/frontend/Post/Post.js";
import PostDetail from "../pages/frontend/Post/PostDetail.js";
import Product from "../pages/frontend/Product/Product.js";
import ProductDetail from "../pages/frontend/Product/ProductDetail.js";
import Wishlist from "../pages/frontend/Wishlish/Wishlish.js";
import PublicContent from '../components/Public/index.js';
import Profile from '../pages/frontend/Profile/Profile.js';
import EditProfile from '../pages/frontend/Profile/EditProfile.js';
import Login from '../pages/frontend/Login/index.js';
import Order from '../pages/frontend/Profile/Order.js';

function RouterPublic() {
  return (
    <Routes>
      <Route path="/" element={<PublicContent />} />
      <Route path="/product" element={<Product />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/productdetail/:id" element={<ProductDetail />} />
      <Route path="/post" element={<Post />} />
      <Route path="/brand" element={<Brand />} />
      <Route path="/postdetail/:id" element={<PostDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/edit" element={<EditProfile />} />
      <Route path="/order" element={<Order />} />

    </Routes>
  );
}

export default RouterPublic;
