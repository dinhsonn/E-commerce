import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Sidebar from "../../components/Admin/Sidebar";


const AddProduct = () => {
  const navigate = useNavigate();

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

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    // Fetch categories and brands from the API
    const fetchCategoriesAndBrands = async () => {
      try {
        const categoriesResponse = await axios.get("http://localhost:8384/api/categories");
        setCategories(categoriesResponse.data.content);

        const brandsResponse = await axios.get("http://localhost:8384/api/brand");
        setBrands(brandsResponse.data.content);
      } catch (error) {
        console.error("Error fetching categories and brands:", error);
      }
    };

    fetchCategoriesAndBrands();
  }, []);

  const handleChange = (e) => {
    const value = e.target.name === "qty" || e.target.name === "price" ? parseFloat(e.target.value) || "" : e.target.value;
    setProduct({ ...product, [e.target.name]: value });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const productData = { ...product };
  
      const response = await axios.post("http://localhost:8384/api/products", productData);
  
      if (response.status === 201) {
        navigate("/product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };
  

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container mt-5">
        <h1>Add New Product</h1>
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
            min={1} // Add min attribute

          />
        </div>
        <div className="mb-3">
          <label className="form-label">Slug:</label>
          <input
            type="text"
            className="form-control"
            name="slug"
            value={product.slug}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
            <label className="form-label">Giá:</label>
            <input
              type="number" // Change to type "number"
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
              type="number" // Change to type "number"
              className="form-control"
              name="qty"
              value={product.qty}
              onChange={handleChange}
              required
              max={20}
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
          {/* Other product fields */}
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
          {/* Image upload */}
        
          <button type="submit" className="btn btn-primary">
            Add Product
          </button>
          <Link className="btn btn-outline-danger mx-2" to="/products">
            Cancel
          </Link>
       </form>
      </div>
    </div>
  );
};

export default AddProduct;
