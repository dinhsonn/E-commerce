import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

import Sidebar from "../../components/Admin/Sidebar";

function ViewProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:8384/api/products/${id}`);
      setProduct(response.data);
      loadCategory(response.data.categoryId);
      loadBrand(response.data.brandId);
    } catch (error) {
      console.error("Error loading product:", error);
    }
  };

  const loadCategory = async (categoryId) => {
    try {
      const response = await axios.get(`http://localhost:8384/api/categories/${categoryId}`);
      setCategory(response.data.name);
    } catch (error) {
      console.error("Error loading category:", error);
    }
  };

  const loadBrand = async (brandId) => {
    try {
      const response = await axios.get(`http://localhost:8384/api/brand/${brandId}`);
      setBrand(response.data.name);
    } catch (error) {
      console.error("Error loading brand:", error);
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container">
        <div className="py-4">
          <h1 className="display-5">Chi tiết sản phẩm</h1>
          <hr />
          <ul className="list-group w-50">
            <li className="list-group-item">Tên sản phẩm: {product.title}</li>
            
            <li className="list-group-item">Giá: {product.price}</li>
            <li className="list-group-item">Số lượng: {product.qty}</li>
            <li className="list-group-item">Mô tả: {product.description}</li>
            <li className="list-group-item">Thương hiệu: {brand}</li>
            <li className="list-group-item">Danh mục: {category}</li>
            <li className="list-group-item">Trạng thái: {product.status}</li>
          </ul>
          <Link className="btn btn-primary mt-3" to="/product">
            Trở lại
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ViewProduct;
