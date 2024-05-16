import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Product from '../pages/backend/Product/Product';
import EditProduct from '../service/Product/EditProduct';
import AddProduct from '../service/Product/AddProduct';
import Category from '../pages/backend/Category/Category';
import AddCat from '../service/Category/AddCat';
import EditCat from '../service/Category/EditCat';
import ViewCat from '../service/Category/ViewCat';
import Brand from '../pages/backend/Brand/Brand';
import AddBrand from '../service/Brand/AddBrand';
import EditBrand from '../service/Brand/EditBrand';
import ViewBrand from '../service/Brand/ViewBrand';
import  User  from '../pages/backend/User/User';
import AddUser from '../service/User/AddUser';
import ViewUser from '../service/User/ViewUser';
import EditUser from '../service/User/EditUser';
import Order from '../pages/backend/Order/Order';
import Slider from '../pages/backend/Slider/Slider';
import AddImage from '../service/Image/AddImage';
import Menu from '../pages/backend/Menu/Menu';
import ViewProduct from '../service/Product/ViewProduct';
import AdminContent from '../components/Admin';
import ProductImage from '../pages/backend/Product/ProductImage';
import EditProductImage from '../service/Image/EditImage';
import AddProductImage from '../service/Image/AddImage';
import AddSlider from '../service/Slider/AddSlider';
import EditSlider from '../service/Slider/EditSlider';
import ViewSlider from '../service/Slider/ViewSlider';
import ViewProductImage from '../service/Image/ViewImage';
import Topic from '../pages/backend/Topic/Topic';
import EditTopic from '../service/Topic/EditTopic';
import AddTopic from '../service/Topic/AddTopic';
import ViewTopic from '../service/Topic/ViewTopic';
import EditMenu from '../service/Menu/EditMenu';
import AddMenu from '../service/Menu/AddMenu';
import ViewMenu from '../service/Menu/ViewMenu';
import EditOrder from '../service/Order/EditOrder';
import ViewOrder from '../service/Order/ViewOrder';
import Contact from '../pages/backend/Contact/Contact';
import ProductSale from '../pages/backend/Product/ProductSale';
import AddSale from '../service/Sale/AddSale';
import Post from '../pages/backend/Post/Post';
import EditPost from '../service/Post/EditPost';
import AddPost from '../service/Post/AddPost';
import ViewPost from '../service/Post/ViewPost';

function RouterAdmin() {
  return (
    <Routes>

        <Route path="/" element={<AdminContent />} />
{/* Product */}
        <Route path="/product" element={<Product />} />
        <Route path="/product/view-product/:id" element={<ViewProduct />} />
        <Route path="/product/edit-product/:id" element={<EditProduct />} />
        <Route path="/product/add-product" element={<AddProduct />} />
{/* Category */}
        <Route path="/category" element={<Category />} />
        <Route path="/category/edit-category/:id" element={<EditCat />} />
        <Route path="/category/view-category/:id" element={<ViewCat />} />
        <Route path="/category/add-category" element={<AddCat />} />
{/* Brand */}
        <Route path="/brand" element={<Brand />} />
        <Route path="/brand/edit-brand/:id" element={<EditBrand />} />
        <Route path="/brand/view-brand/:id" element={<ViewBrand />} />
        <Route path="/brand/add-brand" element={<AddBrand />} />
{/* User */}
        <Route path="/user" element={<User />} />
        <Route path="/user/edit-user/:id" element={<EditUser />} />
        <Route path="/user/view-user/:id" element={<ViewUser />} />
        <Route path="/user/add-user" element={<AddUser />} />
{/* Order */}
        <Route path="/order" element={<Order />} />
        <Route path="/order/edit-order/:id" element={<EditOrder />} />
        <Route path="/order/view-order/:id" element={<ViewOrder />} />

{/* Slider */}
        <Route path="/slider" element={<Slider />} />
        <Route path="/slider/add-slider" element={<AddSlider />} />
        <Route path="/slider/edit-slider/:id" element={<EditSlider />} />
        <Route path="/slider/view-slider/:id" element={<ViewSlider />} />

{/* Menu */}
        <Route path="/menu" element={<Menu />} />      
        <Route path="/menu/edit-menu/:id" element={<EditMenu />} />      
        <Route path="/menu/add-menu" element={<AddMenu />} />      
        <Route path="/menu/view-menu/:id" element={<ViewMenu />} />      

{/* Image */}
        <Route path="/imageproduct" element={<ProductImage />} />
        <Route path="/imageproduct/edit-productimage/:id" element={<EditProductImage />} />
        <Route path="/imageproduct/add-productimage" element={<AddProductImage />} />
        <Route path="/imageproduct/view-productimage/:id" element={<ViewProductImage />} />
{/* Topic */}
        <Route path="/topic" element={<Topic />} />       
        <Route path="/topic/edit-topic/:id" element={<EditTopic />} />       
        <Route path="/topic/add-topic" element={<AddTopic />} />       
        <Route path="/topic/view-topic/:id" element={<ViewTopic />} />       
{/* Contact */}
        <Route path="/contact" element={<Contact />} />       
{/* ProductSale */}
        <Route path="/productsale" element={<ProductSale />} />       
        <Route path="/productsale/edit/:id" element={<ProductSale />} />       
        <Route path="/productsale/view/:id" element={<ProductSale />} />       
        <Route path="/productsale/add" element={<AddSale />} />       
{/* ProductSale */}
        <Route path="/post" element={<Post />} />       
        <Route path="/post/edit-post/:id" element={<EditPost />} />       
        <Route path="/post/add-post" element={<AddPost />} />       
        <Route path="/post/view-post/:id" element={<ViewPost />} />       

    </Routes>


  );
}

export default RouterAdmin;
