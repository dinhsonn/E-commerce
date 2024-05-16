import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";

function EditCat() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [cat, setCat] = useState({
    id: 0,
    name: "",
    slug: "",
    image: "",
    description: "",
    createdAt: "",
    updatedAt: null,
    createdBy: null,
    updatedBy: null,
    status: 1,
  });

  const [newImage, setNewImage] = useState(null);
  const [oldImageName, setOldImageName] = useState("");

  useEffect(() => {
    loadCat();
  }, []);

  const loadCat = async () => {
    try {
      const response = await axios.get(`http://localhost:8384/api/categories/${id}`);
      setCat(response.data);
      setOldImageName(response.data.image);
    } catch (error) {
      console.error("Error loading category:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      setCat((prevCat) => ({
        ...prevCat,
        [name]: value,
        image: value + ".png",
      }));

      if (newImage) {
        setNewImage(null);
      }
    } else {
      setCat((prevCat) => ({
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
        imageFormData.append("customName", cat.name);

        const imageResponse = await axios.post(
          "http://localhost:8384/api/categories/image",
          imageFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (imageResponse.status === 200) {
          setCat((prevCat) => ({
            ...prevCat,
            image: cat.name,
          }));
          setOldImageName(cat.name + ".png");
        }
      }

      await axios.put(`http://localhost:8384/api/categories/${id}`, cat);
      navigate("/category");
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };
  return (
    <div className="container mt-5">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Chỉnh sửa Danh mục</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Tên Danh mục</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={cat.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="slug">Slug</label>
            <input
              type="text"
              className="form-control"
              id="slug"
              name="slug"
              value={cat.slug}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Mô tả</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={cat.description}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Trạng thái</label>
            <select
              className="form-control"
              id="status"
              name="status"
              value={cat.status}
              onChange={handleChange}
            >
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="newImage">Ảnh mới</label>
            <input
              type="file"
              className="form-control"
              id="newImage"
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
              value={cat.image}
              readOnly
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Cập nhật
          </button>
          <Link className="btn btn-outline-danger mx-2" to="/category">
            Hủy
          </Link>
        </form>
      </div>
    </div>
  );
}

export default EditCat;
