import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams,Link } from "react-router-dom";
import Sidebar from "../../components/Admin/Sidebar";

const ViewCat = () => {
  const { id } = useParams();
  const [category, setCategory] = useState({
    name: "",
    slug: "",
    metakey: "",
    metadesc: "",
    status: 1,
    image: "",
  });

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`http://localhost:8384/api/categories/${id}`);
        setCategory(response.data);
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };

    fetchCategory();
  }, [id]);

  return (
    <div className="d-flex">
      <Sidebar />
      
      <div className="container mt-5">
      <Link to="/category" className="btn btn-primary">
            Quay lại
        </Link>
        <h1>Category Details</h1>
        <div>
          <p>
            <strong>Name:</strong> {category.name}
          </p>
          <p>
            <strong>Slug:</strong> {category.slug}
          </p>
          <p>
            <strong>Meta Key:</strong> {category.metakey}
          </p>
          <p>
            <strong>Meta Description:</strong> {category.metadesc}
          </p>
          <p>
            <strong>Status:</strong> {category.status === 1 ? "Active" : "Inactive"}
          </p>
          <p>
            <strong>Image:</strong>{" "}
            {category.image && (
              <img
                src={`http://localhost:8384/api/categories/image/${category.image}`}
                alt={category.name}
                style={{ width: "150px", height: "150px" }}
              />
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewCat;
