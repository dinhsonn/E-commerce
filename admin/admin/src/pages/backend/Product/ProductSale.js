import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from 'date-fns'; // Import thư viện date-fns
import Sidebar from "../../../components/Admin/Sidebar";
import { Link } from "react-router-dom";

function ProductSale() {
  const [productSales, setProductSales] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productSalesPerPage] = useState(10);

  useEffect(() => {
    loadProductSales();
  }, [currentPage]);

  const loadProductSales = async () => {
    try {
      const response = await axios.get("http://localhost:8384/api/productsale");
      setProductSales(response.data.content);
    } catch (error) {
      console.error("Error loading product sales:", error);
    }
  };

  const deleteProductSale = async (id) => {
    try {
      await axios.delete(`http://localhost:8384/api/productsale/${id}`);
      loadProductSales();
    } catch (error) {
      console.error("Error deleting product sale:", error);
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastProductSale = currentPage * productSalesPerPage;
  const indexOfFirstProductSale = indexOfLastProductSale - productSalesPerPage;
  const currentProductSales = productSales.slice(indexOfFirstProductSale, indexOfLastProductSale);

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container">
        <div className="py-4">
          <div className="d-flex justify-content-between mb-3">
            <h1 className="display-10">Danh sách sản phẩm đang giảm giá</h1>
            <Link to="/productsale/add" className="btn btn-success">
              Thêm chủ đề
            </Link>
          </div>
          <table className="table border shadow">
            <thead>
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Tên sản phẩm</th>
                <th scope="col">Giá sale</th>
                <th scope="col">Số lượng</th>
                <th scope="col">Ngày bắt đầu</th>
                <th scope="col">Ngày kết thúc</th>
                <th scope="col">Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {currentProductSales.map((productSale, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{productSale.productId.title}</td>
                  <td>{productSale.salePrice}</td>
                  <td>{productSale.quantitySold}</td>
                  <td>{format(new Date(productSale.dateStart), 'MM/dd/yyyy')}</td> {/* Format ngày */}
                  <td>{format(new Date(productSale.dateEnd), 'MM/dd/yyyy')}</td> {/* Format ngày */}

                  <td>
                  <Link
                      className="btn btn-primary mx-2"
                      to={`/imageproduct/view-productimage/${productSale.id}`}
                    >
                      View
                    </Link>
                    <Link
                      className="btn btn-outline-primary mx-2"
                      to={`/imageproduct/edit-productimage/${productSale.id}`}
                    >
                      Edit
                    </Link>
                    <button className="btn btn-danger mx-2" onClick={() => deleteProductSale(productSale.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <nav>
            <ul className="pagination">
              {[...Array(Math.ceil(productSales.length / productSalesPerPage)).keys()].map((number) => (
                <li key={number + 1} className="page-item">
                  <button className="page-link" onClick={() => paginate(number + 1)}>
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

export default ProductSale;
