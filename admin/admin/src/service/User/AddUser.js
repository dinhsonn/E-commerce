import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Admin/Sidebar";

const AddUser = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    address: "",
    image: "",
    roles: "USER",
    status: 1,
  });

  const [image, setImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setUser((prevSlider) => ({
        ...prevSlider,
        [name]: value,
        image: value,
      }));
    } else {
      setUser((prevSlider) => ({
        ...prevSlider,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const imageFormData = new FormData();
      imageFormData.append("file", image);
      imageFormData.append("customName", user.name);

      const imageResponse = await axios.post("http://localhost:8384/api/users/image", imageFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (imageResponse.status === 200) {
        const userData = {
          ...user,
          image: user.name,
          createdBy: "admin",
        };

        const userResponse = await axios.post("http://localhost:8384/api/users", userData);

        if (userResponse.status === 201) {
          navigate("/user");
        }
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };
  return (
    <div className="d-flex">
    <Sidebar />
    <div className="container mt-5">
      <h1>Add New User</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name:</label>
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
          <label className="form-label">Phone:</label>
          <input
            type="text"
            className="form-control"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">User name:</label>
          <input
            type="username"
            className="form-control"
            name="username"
            value={user.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Address:</label>
          <input
            type="address"
            className="form-control"
            name="address"
            value={user.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
  <label className="form-label">Password:</label>
  <div className="input-group">
    <input
      type={showPassword ? "text" : "password"}
      className="form-control"
      name="password"
      value={user.password}
      onChange={handleChange}
      required
    />
    <button
      className="btn btn-outline-secondary"
      type="button"
      onClick={togglePasswordVisibility}
    >
      {showPassword ? "Hide" : "Show"}
    </button>
  </div>
</div>
        {/* ... (add other form fields) */}
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
        {/* ... (display the selected image if needed) */}
        {image && (
          <div className="mb-3">
            <img
              src={`http://localhost:8384/api/users/image/${user.name}`}
              alt="user"
              style={{ maxWidth: "100%", maxHeight: "200px" }}
            />
          </div>
        )}
        <button type="submit" className="btn btn-primary">
          Add User
        </button>
      </form>
    </div>
    </div>
  );
};

export default AddUser;
