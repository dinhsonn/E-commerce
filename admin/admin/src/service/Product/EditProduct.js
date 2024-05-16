import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link, useParams } from "react-router-dom";
import Sidebar from "../../components/Admin/Sidebar";

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState({
    title: "",
    slug: "",
    price: "",
    qty: "",
    description: "",
    categoryId: "",
    brandId: "",
    metakey: "",
    metadesc: "",
    status: "",
  });

  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        // Fetch product details by ID
        const productResponse = await axios.get(`http://localhost:8384/api/products/${id}`);
        const existingProduct = productResponse.data;

        // Fetch categories and brands from the API
        const categoriesResponse = await axios.get("http://localhost:8384/api/categories");
        setCategories(categoriesResponse.data.content);

        const brandsResponse = await axios.get("http://localhost:8384/api/brand");
        setBrands(brandsResponse.data.content);

        // Set product details in the state
        setProduct(existingProduct);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Đối với các trường số, chuyển đổi giá trị thành số
    const numericValue = ['qty', 'price'].includes(name) ? parseFloat(value) || 0 : value;

    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: numericValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productResponse = await axios.put(
        `http://localhost:8384/api/products/${id}`,
        product
      );

      if (productResponse.status === 200) {
        navigate("/product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container mt-5">
        <h1>Edit Product</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Tên sản phẩm:</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={product.title}
              onChange={handleChange}
              required
              min={1}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Giá:</label>
            <input
              type="text"
              className="form-control"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Số lượng:</label>
            <input
              type="text"
              className="form-control"
              name="qty"
              value={product.qty}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Chi tiết sản phẩm:</label>
            <input
              type="text"
              className="form-control"
              name="description"
              value={product.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Meta Key:</label>
            <input
              type="text"
              className="form-control"
              name="metakey"
              value={product.metakey}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Meta Description:</label>
            <textarea
              className="form-control"
              name="metadesc"
              value={product.metadesc}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Category:</label>
            <select
              className="form-select"
              name="categoryId"
              value={product.categoryId}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Brand:</label>
            <select
              className="form-select"
              name="brandId"
              value={product.brandId}
              onChange={handleChange}
            >
              <option value="">Select Brand</option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Status:</label>
            <select
              className="form-select"
              name="status"
              value={product.status}
              onChange={handleChange}
            >
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Update Product
          </button>
          <Link className="btn btn-outline-danger mx-2" to="/product">
            Cancel
          </Link>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
