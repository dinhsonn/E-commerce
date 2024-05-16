import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Sidebar from "../../components/Admin/Sidebar";

function AddProductImage() {
  const navigate = useNavigate();

  const [productImage, setProductImage] = useState({
    productId: "",

    name: "",
    image: "",
    isPrimary: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProductImage((prevProductImage) => ({
      ...prevProductImage,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (image) {
        const imageFormData = new FormData();
        imageFormData.append("file", image);
        imageFormData.append("customName", productImage.name);

        const imageResponse = await axios.post(
          "http://localhost:8082/api/productimages/image",
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
            image: productImage.name,
          }));
        }
      }
      await axios.post("http://localhost:8082/api/productimages", productImage);
      navigate("/imageproduct");
    } catch (error) {
      console.error("Error adding product image:", error);
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container mt-5">
        <h1>Add Product Image</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Product ID:</label>
            <input
              type="text"
              className="form-control"
              name="productId"
              value={productImage.productId}
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
            Add Product Image
          </button>
          <Link className="btn btn-outline-danger mx-2" to="/imageproduct">
            Cancel
          </Link>
        </form>
      </div>
    </div>
  );
}

export default AddProductImage;
