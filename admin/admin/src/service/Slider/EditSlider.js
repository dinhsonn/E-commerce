import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import Sidebar from "../../components/Admin/Sidebar";

function EditSlider() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [slider, setSlider] = useState({
    name: "",
    link: "",
    sortOrder: 0,
    position: 1,
    status: 1,
    image: "",
    createdBy: 1,
  });

  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    loadSlider();
  }, []);

  const loadSlider = async () => {
    try {
      const response = await axios.get(`http://localhost:8384/api/sliders/${id}`);
      setSlider(response.data);
    } catch (error) {
      console.error("Error loading slider:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      setSlider((prevCat) => ({
        ...prevCat,
        [name]: value,
        image: value + ".png",  
      }));

      if (newImage) {
        setNewImage(null);
      }
    } else {
      setSlider((prevCat) => ({
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
        imageFormData.append("customName", slider.name);

        const imageResponse = await axios.post(
          "http://localhost:8384/api/sliders/image",
          imageFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (imageResponse.status === 200) {
          setSlider((prevSlider) => ({
            ...prevSlider,
            image: slider.name,
          }));
        }
      }

      await axios.put(`http://localhost:8384/api/sliders/${id}`, slider);
      navigate("/slider");
    } catch (error) {
      console.error("Error updating slider:", error);
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container mt-5">
        <h1>Edit Slider</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name:</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={slider.name}
              onChange={handleChange}
              required  
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Link:</label>
            <input
              type="text"
              className="form-control"
              name="link"
              value={slider.link}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Sort Order:</label>
            <input
              type="number"
              className="form-control"
              name="sortOrder"
              value={slider.sortOrder}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Position:</label>
            <input
              type="number"
              className="form-control"
              name="position"
              value={slider.position}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Status:</label>
            <select
              className="form-select"
              name="status"
              value={slider.status}
              onChange={handleChange}
              required
            >
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
            </select>
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
              value={slider.image}
              readOnly
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Update Slider
          </button>
          <Link className="btn btn-outline-danger mx-2" to="/slider">
            Cancel
          </Link>
        </form>
      </div>
    </div>
  );
}

export default EditSlider;
