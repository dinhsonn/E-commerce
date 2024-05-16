import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Sidebar from "../../components/Admin/Sidebar";

function ViewSlider() {
  const { id } = useParams();

  const [slider, setSlider] = useState({
    name: "",
    link: "",
    sortOrder: 0,
    position: 1,
    status: 1,
    image: "",
    createdBy: 1,
  });

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

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container mt-5">
        <h1>View Slider</h1>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Name: {slider.name}</h5>
            <p className="card-text">Link: {slider.link}</p>
            <p className="card-text">Sort Order: {slider.sortOrder}</p>
            <p className="card-text">Position: {slider.position}</p>
            <p className="card-text">Status: {slider.status === 1 ? 'Active' : 'Inactive'}</p>
            <img src={`http://localhost:8384/api/sliders/image/${slider.image}`} alt="Slider" className="img-fluid mb-3" />
            <Link className="btn btn-primary" to={`/editslider/${id}`}>
              Edit
            </Link>
            <Link className="btn btn-outline-danger mx-2" to="/slider">
              Back to List
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewSlider;
