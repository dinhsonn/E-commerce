    import React, { useEffect, useState } from "react";
    import axios from "axios";
    import { Link } from "react-router-dom";

    import Sidebar from "../../../components/Admin/Sidebar";

    function Product() {
      const [products, setProducts] = useState([]);
      const [categories, setCategories] = useState([]);
      const [brands, setBrands] = useState([]);
      const [currentPage, setCurrentPage] = useState(1);
      const [productsPerPage] = useState(10);

      useEffect(() => {
        loadProducts();
        loadCategories();
        loadBrands();
      }, [currentPage]);

      const loadProducts = async () => {
        try {
          const response = await axios.get("http://localhost:8082/api/products");
          setProducts(response.data.content);
        } catch (error) {
          console.error("Error loading products:", error);
        }
      };

      const loadCategories = async () => {
        try {
          const response = await axios.get("http://localhost:8082/api/categories");
          setCategories(response.data.content);
        } catch (error) {
          console.error("Error loading categories:", error);
        }
      };

      const loadBrands = async () => {
        try {
          const response = await axios.get("http://localhost:8082/api/brands");
          setBrands(response.data.content);
        } catch (error) {
          console.error("Error loading brands:", error);
        }
      };

      const deleteProduct = async (id) => {
        try {
          await axios.delete(`http://localhost:8384/api/products/${id}`);
          loadProducts();
        } catch (error) {
          console.error("Error deleting product:", error);
        }
      };

      const getCategoryName = (categoryId) => {
        const category = categories.find((c) => c.id === categoryId);
        return category ? category.name : "";
      };

      const getBrandName = (brandId) => {
        const brand = brands.find((b) => b.id === brandId);
        return brand ? brand.name : "";
      };

      const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
      };

      const indexOfLastProduct = currentPage * productsPerPage;
      const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
      const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

      return (
        <div className="d-flex">
          <Sidebar />
          <div className="container">
            <div className="py-4">
              <div className="d-flex justify-content-between mb-3">
                <h1 className="display-10">Danh sách sản phẩm</h1>
                <Link to="/product/add-product" className="btn btn-success">
                  Add Product
                </Link>
              </div>
              <table className="table border shadow">
                <thead>
                  <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Tên sản phẩm</th>
                    <th scope="col">ID sản phẩm</th>
                    <th scope="col">Giá</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Mô tả</th>
                    <th scope="col">Loại sản phẩm</th>
                    <th scope="col">Thương hiệu</th>
                    <th scope="col">Trạng thái</th>
                    <th scope="col">Chức năng</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProducts.map((product, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{product.title}</td>
                      <td>{product.id}</td>
                      <td>{product.price}</td>
                      <td>{product.qty}</td>
                      <td>{product.description}</td>
                      <td>{getCategoryName(product.categoryId)}</td>
                      <td>{getBrandName(product.brandId)}</td>
                      <td>{product.status}</td>
                      <td>
                        <Link
                          className="btn btn-primary mx-2"
                          to={`/product/view-product/${product.id}`}
                        >
                          View
                        </Link>
                        <Link
                          className="btn btn-outline-primary mx-2"
                          to={`/product/edit-product/${product.id}`}
                        >
                          Edit
                        </Link>
                        <button
                          className="btn btn-danger mx-2"
                          onClick={() => deleteProduct(product.id)}
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
                  {[...Array(Math.ceil(products.length / productsPerPage)).keys()].map((number) => (
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

    export default Product;
