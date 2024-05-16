import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams,Link } from "react-router-dom";
import Sidebar from "../../components/Admin/Sidebar";

const ViewBrand = () => {
  const { id } = useParams();
  const [brand, setBrand] = useState({
    name: "",
    slug: "",
    metakey: "",
    metadesc: "",
    status: 1,
    image: "",
  });

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const response = await axios.get(`http://localhost:8384/api/brand/${id}`);
        setBrand(response.data);
      } catch (error) {
        console.error("Error fetching brand:", error);
      }
    };

    fetchBrand();
  }, [id]);

  return (
    <div className="d-flex">
      <Sidebar />
      
      <div className="container mt-5">
      <Link to="/brand" className="btn btn-primary">
            Quay lại
        </Link>
        <h1>Category Details</h1>
        <div>
          <p>
            <strong>Name:</strong> {brand.name}
          </p>
          <p>
            <strong>Slug:</strong> {brand.slug}
          </p>
          <p>
            <strong>Meta Key:</strong> {brand.metakey}
          </p>
          <p>
            <strong>Meta Description:</strong> {brand.metadesc}
          </p>
          <p>
            <strong>Status:</strong> {brand.status === 1 ? "Active" : "Inactive"}
          </p>
          <p>
            <strong>Image:</strong>{" "}
            {brand.image && (
              <img
                src={`http://localhost:8384/api/categories/image/${brand.image}`}
                alt={brand.name}
                style={{ width: "150px", height: "150px" }}
              />
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewBrand;
