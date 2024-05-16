import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Admin/Sidebar";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    address: "",
    image: "",
    roles: "",
    status: "",
  });
  const [image, setImage] = useState(null);
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8384/api/users/${id}`);
            setUser(response.data);
      } catch (error) {
        console.error("Error fetching brand:", error);
      }
    };

    fetchUser();
}, [id]);

const handleChange = (e) => {
  const { name, value } = e.target;

  if (name === "name") {
    setUser((prevCat) => ({
      ...prevCat,
      [name]: value,
      image: value + ".png",
    }));

    if (newImage) {
      setNewImage(null);
    }
  } else {
    setUser((prevCat) => ({
      ...prevCat,
      [name]: value,
    }));
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (newImage) {
      const imageFormData = new FormData();
      imageFormData.append("file", newImage);
      imageFormData.append("customName", user.name);

      const imageResponse = await axios.post(
        "http://localhost:8384/api/users/image",
        imageFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (imageResponse.status === 200) {
        setUser((prevUser) => ({
          ...prevUser,
          image: user.name,
        }));
      }
    }

    await axios.put(`http://localhost:8384/api/users/${id}`, user);
    navigate("/user");
  } catch (error) {
    console.error("Error updating slider:", error);
  }
};

const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setNewImage(file);
  }
};

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container mt-5">
        <h1>Edit User</h1>
        <form onSubmit={handleSubmit}>
          {/* Form fields for editing user details */}
          <div className="mb-3">
            <label className="form-label">Tên người dùng:</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={user.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Hình ảnh:</label>
            <input
              type="file"
              accept="image/*"
              className="form-control"
              name="image"
              onChange={handleImageChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Ảnh</label>
            <input
              type="text"
              className="form-control"
              id="image"
              name="image"
              value={user.image}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Trạng thái:</label>
            <select
              className="form-select"
              name="status"
              value={user.status}
              onChange={handleChange}
            >
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
            </select>
          </div>

          {/* Submit button */}
          <button type="submit" className="btn btn-primary">
            Cập nhật người dùng
          </button>
          <Link className="btn btn-outline-danger mx-2" to="/user">
            Hủy
          </Link>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
