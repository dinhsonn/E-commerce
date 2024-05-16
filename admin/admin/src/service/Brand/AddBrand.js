import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Sidebar from "../../components/Admin/Sidebar";

const AddBrand = () => {
  const navigate = useNavigate();

  const [brand, setBrand] = useState({
    name: "",
    slug: "",
    metakey: "",
    metadesc: "",
    status: 1,
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => { 
    setBrand({ ...brand, [e.target.name]: e.target.value });
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
      const imageFormData = new FormData();
      imageFormData.append("file", image);
      imageFormData.append("customName", brand.name);

      const imageResponse = await axios.post("http://localhost:8384/api/brand/image", imageFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (imageResponse.status === 200) {
        const brandData = {
          ...brand,
          image: brand.name,
        };

        const brandResponse = await axios.post("http://localhost:8384/api/brand", brandData);

        if (brandResponse.status === 201) {
          navigate("/brand");
        }
      }
    } catch (error) {
      console.error("Error adding brand:", error);
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container mt-5">
        <h1>Add New Brand</h1>
        <form onSubmit={handleSubmit}>
          {/* Các trường thông tin của thương hiệu */}
          <div className="mb-3">
            <label className="form-label">Brand Name:</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={brand.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Slug:</label>
            <input
              type="text"
              className="form-control"
              name="slug"
              value={brand.slug}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Image:</label>
            <input
              type="file"
              accept="image/*"
              className="form-control"
              name="image"
              onChange={handleImageChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Meta Key:</label>
            <input
              type="text"
              className="form-control"
              name="metakey"
              value={brand.metakey}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Meta Description:</label>
            <textarea
              className="form-control"
              name="metadesc"
              value={brand.metadesc}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Status:</label>
            <select
              className="form-select"
              name="status"
              value={brand.status}
              onChange={handleChange}
            >
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
            </select>
          </div>

          {/* Nút Submit */}
          <button type="submit" className="btn btn-primary">
            Add Brand
          </button>
          <Link className="btn btn-outline-danger mx-2" to="/brand">
            Hủy
          </Link>
        </form>
      </div>
    </div>
  );
};

export default AddBrand;
