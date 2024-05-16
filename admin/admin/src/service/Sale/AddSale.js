import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Sidebar from "../../components/Admin/Sidebar";

function AddSale() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    productId: {
      id: "",
      title: "",

    },
    salePrice: "",
    quantitySold: "",
    dateStart: "",
    dateEnd: "",
    status: 1,

  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await axios.post("http://localhost:8384/api/productsale", formData);
      navigate("/productsale");
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
              value={formData.productId.id}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
              <label htmlFor="salePrice" className="form-label">Sale Price</label>
              <input type="number" className="form-control" id="salePrice" name="salePrice" value={formData.salePrice} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="quantitySold" className="form-label">Quantity Sold</label>
              <input type="number" className="form-control" id="quantitySold" name="quantitySold" value={formData.quantitySold} onChange={handleChange} required />
            </div>
          <div className="mb-3">
              <label htmlFor="dateStart" className="form-label">Start Date</label>
              <input type="date" className="form-control" id="dateStart" name="dateStart" value={formData.dateStart} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="dateEnd" className="form-label">End Date</label>
              <input type="date" className="form-control" id="dateEnd" name="dateEnd" value={formData.dateEnd} onChange={handleChange} required />
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

export default AddSale;
