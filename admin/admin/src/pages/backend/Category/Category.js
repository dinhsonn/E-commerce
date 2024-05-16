import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Sidebar from "../../../components/Admin/Sidebar";

function Category() {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(10);

  useEffect(() => {
    loadCategories();
  }, [currentPage]);

  const loadCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8384/api/categories");
      const updatedCategories = response.data.content.map((category) => ({
        ...category,
        image: category.name + ".png", 
      }));
      setCategories(updatedCategories);
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };
  
  const deleteCat = async (id) => {
    try {
      await axios.delete(`http://localhost:8384/api/categories/${id}`);
      loadCategories();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container">
        <div className="py-4">
          <div className="d-flex justify-content-between mb-3">
            <h1 className="display-10">Danh sách loại sản phẩm</h1>
            <Link to="/category/add-category" className="btn btn-success">
              Add Product
            </Link>
          </div>
          <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Tên loại sản phẩm</th>
              <th scope="col">Slug</th>
              <th scope="col">Ảnh </th>
              <th scope="col">metakey</th>
              <th scope="col">metadesc</th>
              <th scope="col">Trạng thái</th>
              <th scope="col">Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {currentCategories.map((category, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{category.name}</td>
                <td>{category.slug}</td>
                <td>
                <td>
        {category.image && (
          <img
            src={`http://localhost:8384/api/categories/image/${category.image}`}
            alt={category.name}
            style={{ width: "70px", height: "70px" }}
          />
        )}
      </td>
                </td>
                <td>{category.metakey}</td>
                <td>{category.metadesc}</td>
                <td>{category.status}</td>
                <td>
                  <Link
                    className="btn btn-primary mx-2"
                    to={`/category/view-category/${category.id}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/category/edit-category/${category.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteCat(category.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
          <nav>
            <ul className="pagination">
              {[...Array(Math.ceil(categories.length / categoriesPerPage)).keys()].map((number) => (
                <li key={number + 1} className="page-item">
                  <button
                    className="page-link"
                    onClick={() => paginate(number + 1)}
                  >
                    {number + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Category;
