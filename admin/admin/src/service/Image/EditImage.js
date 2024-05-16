import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import Sidebar from "../../components/Admin/Sidebar";

function EditProductImage() {
    const { id } = useParams();
    const navigate = useNavigate();
  
    const [productImage, setProductImage] = useState({
      id: 0,
      productId: {
        id: 0,
        title: "",
      },
      name: "",
      image: "",
      isPrimary: "",
      createdAt: "",
      updatedAt: null,
    });
  
    const [newImage, setNewImage] = useState(null);
  
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
  
    const handleChange = (e) => {
        const { name, value } = e.target;
    
        if (name === "name") {
            setProductImage((prevCat) => ({
            ...prevCat,
            [name]: value,
            image: value + ".png",
          }));
    
          if (newImage) {
            setNewImage(null);
          }
        } else {
            setProductImage((prevCat) => ({
            ...prevCat,
            [name]: value,
          }));
        }
      };
  
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setNewImage(file);
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        if (newImage) {
          const imageFormData = new FormData();
          imageFormData.append("file", newImage);
          imageFormData.append("customName", productImage.name); // Sử dụng tên ảnh từ state
  
          const imageResponse = await axios.post(
            "http://localhost:8384/api/productimages/image",
            imageFormData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
  
          if (imageResponse.status === 200) {
            setProductImage((prevProductImage) => ({
              ...prevProductImage,
              image: productImage.name, // và sửa ở đây
            }));
          }
        }
  
        await axios.put(`http://localhost:8384/api/productimages/${id}`, productImage);
        navigate("/imageproduct");
      } catch (error) {
        console.error("Error updating product image:", error);
      }
    };
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container mt-5">
        <h1>Edit Product Image</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Product ID:</label>
            <input
              type="text"
              className="form-control"
              name="productId"
              value={productImage.productId.id}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Title:</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={productImage.productId.title}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Tên ảnh</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={productImage.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Image:</label>
            <input
              type="file"
              accept="image/*"
              className="form-control"
              name="newImage"
              onChange={handleImageChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Ảnh</label>
            <input
              type="text"
              className="form-control"
              id="image"
              name="image"
              value={productImage.image}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Is Primary:</label>
            <input
              type="text"
              className="form-control"
              name="isPrimary"
              value={productImage.isPrimary}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Update Product Image
          </button>
          <Link className="btn btn-outline-danger mx-2" to="/imageproduct">
            Cancel
          </Link>
        </form>
      </div>
    </div>
  );
}

export default EditProductImage;
