import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate,Link } from "react-router-dom";

function EditBrand() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [brand, setBrand] = useState({
    id: 0,
    name: "",
    slug: "",
    image: "",
    sortOrder: 0,
    metakey: "",
    metadesc: "",
    createdAt: "",
    updatedAt: null,
    createdBy: null,
    updatedBy: null,
    status: 1,
  });

  const [newImage, setNewImage] = useState(null);
  const [oldImageName, setOldImageName] = useState("");

  useEffect(() => {
    loadBrand();
  }, []);

  const loadBrand = async () => {
    try {
      const response = await axios.get(`http://localhost:8384/api/brand/${id}`);
      setBrand(response.data);
      setOldImageName(response.data.image);

    } catch (error) {
      console.error("Error loading brand:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "name") {
      setBrand((prevBrand) => ({
        ...prevBrand,
        [name]: value,
        image: value + ".png", // Chỉ cập nhật ảnh dựa trên tên khi tên thay đổi
      }));
  
      if (newImage) {
        setNewImage(null); // Reset ảnh mới nếu người dùng thay đổi tên
      }
    } else {
      setBrand((prevBrand) => ({
        ...prevBrand,
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
          imageFormData.append("customName", brand.name);

          const imageResponse = await axios.post(
            "http://localhost:8384/api/brand/image",
            imageFormData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          if (imageResponse.status === 200) {
            setBrand((prevBrand) => ({
              ...prevBrand,
              image: brand.name,
            }));
            setOldImageName(brand.name + ".png");

          }
        }

        await axios.put(`http://localhost:8384/api/brand/${id}`, brand);
        navigate("/brand");
      } catch (error) {
        console.error("Error updating brand:", error);
      }
    };

  return (
    <div className="container mt-5">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Chỉnh sửa Thương hiệu</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Tên Thương hiệu</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={brand.name}
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
              value={brand.slug}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="metakey">Meta Key</label>
            <input
              type="text"
              className="form-control"
              id="metakey"
              name="metakey"
              value={brand.metakey}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="metadesc">Meta Description</label>
            <textarea
              className="form-control"
              id="metadesc"
              name="metadesc"
              value={brand.metadesc}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Trạng thái</label>
            <select
              className="form-control"
              id="status"
              name="status"
              value={brand.status}
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
              value={brand.image}
              readOnly
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Cập nhật
          </button>
          <Link className="btn btn-outline-danger mx-2" to="/brand">
              Hủy
        </Link>
        </form>
      </div>
    </div>
  );
}

export default EditBrand;
