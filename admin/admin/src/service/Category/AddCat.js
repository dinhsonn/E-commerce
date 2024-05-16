import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Sidebar from "../../components/Admin/Sidebar";

const AddCat = () => {
  const navigate = useNavigate();

  const [category, setCategory] = useState({
    name: "",
    slug: "",
    metakey: "",
    metadesc: "",
    status: 1,
    parent_id: 1,

  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => { 
    setCategory({ ...category, [e.target.name]: e.target.value });
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
      imageFormData.append("customName", category.name);

      const imageResponse = await axios.post("http://localhost:8384/api/categories/image", imageFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (imageResponse.status === 200) {
        const categoryData = {
          ...category,
          image: category.name,
        };

        const categoryResponse = await axios.post("http://localhost:8384/api/categories", categoryData);

        if (categoryResponse.status === 201) {
          navigate("/category");
        }
      }
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container mt-5">
        <h1>Add New category</h1>
        <form onSubmit={handleSubmit}>
          {/* Các trường thông tin của thương hiệu */}
          <div className="mb-3">
            <label className="form-label">Category Name:</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={category.name}
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
              value={category.slug}
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
              value={category.metakey}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Meta Description:</label>
            <textarea
              className="form-control"
              name="metadesc"
              value={category.metadesc}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Parent ID:</label>
            <input
              type="number"
              className="form-control"
              name="parent_id"
              value={category.parent_id}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Status:</label>
            <select
              className="form-select"
              name="status"
              value={category.status}
              onChange={handleChange}
            >
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
            </select>
          </div>

          {/* Nút Submit */}
          <button type="submit" className="btn btn-primary">
            Add category
          </button>
          <Link className="btn btn-outline-danger mx-2" to="/category">
            Hủy
          </Link>
        </form>
      </div>
    </div>
  );
};

export default AddCat;
