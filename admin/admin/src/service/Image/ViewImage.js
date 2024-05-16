import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Sidebar from "../../components/Admin/Sidebar";

function ViewProductImage() {
  const { id } = useParams();

  const [productImage, setProductImage] = useState({
    productId: {
      id: "",
      title: "",
    },
    name: "",
    image: "",
    isPrimary: "",
  });

  useEffect(() => {
    loadProductImage();
  }, []);

  const loadProductImage = async () => {
    try {
      const response = await axios.get(`http://localhost:8384/api/productimages/${id}`);
      setProductImage(response.data);
    } catch (error) {
      console.error("Error loading product image:", error);
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container mt-5">
        <h1>View Product Image</h1>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Product ID: {productImage.productId.id}</h5>
            <p className="card-text">Title: {productImage.productId.title}</p>
            <p className="card-text">Tên ảnh: {productImage.name}</p>
            <img src={`http://localhost:8384/api/productimages/image/${productImage.image}`} alt="Product Image" className="img-fluid mb-3" />
            <p className="card-text">Is Primary: {productImage.isPrimary}</p>
            <Link className="btn btn-primary" to={`/editproductimage/${id}`}>
              Edit
            </Link>
            <Link className="btn btn-outline-danger mx-2" to="/imageproduct">
              Back to List
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewProductImage;
