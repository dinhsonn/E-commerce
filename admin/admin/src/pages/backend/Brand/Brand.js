import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Sidebar from "../../../components/Admin/Sidebar";

function Brand() {
  const [brands, setBrands] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [brandsPerPage] = useState(10);

  useEffect(() => {
    loadBrands();
  }, [currentPage]);

  const loadBrands = async () => {
    try {
      const response = await axios.get("http://localhost:8384/api/brand");
      const updatedBrands = response.data.content.map((brand) => ({
        ...brand,
        logo: brand.name + ".png",
      }));
      setBrands(updatedBrands);
    } catch (error) {
      console.error("Error loading brands:", error);
    }
  };

  const deleteBrand = async (id) => {
    try {
      await axios.delete(`http://localhost:8384/api/brand/${id}`);
      loadBrands();
    } catch (error) {
      console.error("Error deleting brand:", error);
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastBrand = currentPage * brandsPerPage;
  const indexOfFirstBrand = indexOfLastBrand - brandsPerPage;
  const currentBrands = brands.slice(indexOfFirstBrand, indexOfLastBrand);

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container">
        <div className="py-4">
          <div className="d-flex justify-content-between mb-3">
            <h1 className="display-10">Danh sách thương hiệu</h1>
            <Link to="/brand/add-brand" className="btn btn-success">
              Thêm thương hiệu
            </Link>
          </div>
          <table className="table border shadow">
            <thead>
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Tên thương hiệu</th>
                <th scope="col">Logo</th>
                <th scope="col">Mô tả</th>
                <th scope="col">Trạng thái</th>
                <th scope="col">Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {currentBrands.map((brand, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{brand.name}</td>
                  <td>
                    {brand.image && (
                      <img
                        src={`http://localhost:8384/api/brand/image/${brand.image}`}
                        alt={brand.name}
                        style={{ width: "70px", height: "70px" }}
                      />
                    )}
                  </td>
                  <td>{brand.description}</td>
                  <td>{brand.status}</td>
                  <td>
                    <Link
                      className="btn btn-primary mx-2"
                      to={`/brand/view-brand/${brand.id}`}
                    >
                      Xem
                    </Link>
                    <Link
                      className="btn btn-outline-primary mx-2"
                      to={`/brand/edit-brand/${brand.id}`}
                    >
                      Sửa
                    </Link>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => deleteBrand(brand.id)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <nav>
            <ul className="pagination">
              {[...Array(Math.ceil(brands.length / brandsPerPage)).keys()].map((number) => (
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

export default Brand;
