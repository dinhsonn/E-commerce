import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Sidebar from "../../../components/Admin/Sidebar";

function ProductImage() {
  const [productImages, setProductImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productImagesPerPage] = useState(10);

  useEffect(() => {
    loadProductImages();
  }, [currentPage]);

  const loadProductImages = async () => {
    try {
      const response = await axios.get("http://localhost:8384/api/productimages");
      setProductImages(response.data.content);
    } catch (error) {
      console.error("Error loading product images:", error);
    }
  };

  const deleteProductImage = async (id) => {
    try {
      await axios.delete(`http://localhost:8384/api/productimages/${id}`);
      loadProductImages();
    } catch (error) {
      console.error("Error deleting product image:", error);
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastProductImage = currentPage * productImagesPerPage;
  const indexOfFirstProductImage = indexOfLastProductImage - productImagesPerPage;
  const currentProductImages = productImages.slice(
    indexOfFirstProductImage,
    indexOfLastProductImage
  );

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container">
        <div className="py-4">
          <div className="d-flex justify-content-between mb-3">
            <h1 className="display-10">Danh sách hình ảnh sản phẩm</h1>
            <Link to="/imageproduct/add-productimage" className="btn btn-success">
              Add Product Image
            </Link>
          </div>
          <table className="table border shadow">
            <thead>
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Product ID</th>
                <th scope="col">Title</th>
                <th scope="col">Image</th>
                <th scope="col">Is Primary</th>
                <th scope="col">Created At</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProductImages.map((productImage, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{productImage.productId.id}</td>
                  <td>{productImage.productId.title}</td>
                  <td>
                    {productImage.image && (
                      <img
                        src={`http://localhost:8384/api/productimages/image/${productImage.image}`}
                        alt={productImage.productId.title}
                        style={{ width: "70px", height: "70px" }}
                      />
                    )}
                  </td>
                  <td>{productImage.isPrimary}</td>
                  <td>{productImage.createdAt}</td>
                  <td>
                    <Link
                      className="btn btn-primary mx-2"
                      to={`/imageproduct/view-productimage/${productImage.id}`}
                    >
                      View
                    </Link>
                    <Link
                      className="btn btn-outline-primary mx-2"
                      to={`/imageproduct/edit-productimage/${productImage.id}`}
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => deleteProductImage(productImage.id)}
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
              {[...Array(Math.ceil(productImages.length / productImagesPerPage)).keys()].map(
                (number) => (
                  <li key={number + 1} className="page-item">
                    <button
                      className="page-link"
                      onClick={() => paginate(number + 1)}
                    >
                      {number + 1}
                    </button>
                  </li>
                )
              )}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default ProductImage;
