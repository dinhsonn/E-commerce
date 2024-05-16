import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CategoryService from '../../../services/CategoryServices';
import ProductService from '../../../services/ProductServices';
import ProductItem from './ProductItem';
import BrandServices from '../../../services/BrandServices';
import Header from '../../../components/Public/Header';
import Footer from '../../../components/Public/Footer';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [productImages, setProductImages] = useState([]);
  const productsPerPage = 15;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBrand, setSelectedBrand] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [productsResponse, productImagesResponse] = await Promise.all([
          ProductService.getAll(),
          ProductService.getProductImage(),
        ]);

        const productsData = productsResponse.data.content;
        const productImagesData = productImagesResponse.data.content;
        setProducts(productsData);
        setProductImages(productImagesData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await CategoryService.getAll();
        setCategories(response.data.content);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchBrands = async () => {
      try {
        const response = await BrandServices.getAll();
        setBrands(response.data.content);
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    };

    fetchProducts();
    fetchCategories();
    fetchBrands();
  }, []);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };
  const handleBrandClick = (brandId) => {
    setSelectedBrand(brandId);
  };
  const handleClearAll = () => {
    setSelectedCategory('');
  };

  const combinedData = products.map(product => {
    const correspondingImages = productImages.filter(image => image.productId.id === product.id && image.isPrimary === 1);
    const correspondingImages2 = productImages.filter(image => image.productId.id === product.id && image.isPrimary === 2);
  
    const imageUrls = correspondingImages.map(image => image.image);
    const image2Urls = correspondingImages2.map(image => image.image);
    return {
      ...product,
      image: imageUrls.length > 0 ? imageUrls[0] : null,
      image2: image2Urls.length > 0 ? image2Urls[0] : null,
    };
  });
  
  const filteredCombinedData = selectedCategory
  ? combinedData.filter((product) => product.categoryId === parseInt(selectedCategory))
  : combinedData;

const filteredData = selectedBrand
  ? filteredCombinedData.filter((product) => product.brandId === parseInt(selectedBrand))
  : filteredCombinedData;
  
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = Math.min(startIndex + productsPerPage, filteredCombinedData.length);
  const currentProducts = filteredCombinedData.slice(startIndex, endIndex);

  return (
    <>
    <Header />
      <div className="page-wrapper">
        <main className="main">
          <nav aria-label="breadcrumb" className="breadcrumb-nav mb-2">
            <div className="container">
              {/* Breadcrumb navigation */}
            </div>
          </nav>
          <div className="page-content">
            <div className="container">
              <div className="row">
                <div className="col-lg-9">
                  <div className="products mb-3">
                    <div className="row justify-content">
                      {currentProducts.map((combinedItem, index) => (
                        <ProductItem product={combinedItem} key={index} />
                      ))}
                    </div>
                  </div>
                  <nav aria-label="Page navigation">
                    <ul className="pagination">
                      {/* Phân trang */}
                    </ul>
                  </nav>
                </div>
                <aside className="col-lg-3 order-lg-first">
                  <div className="sidebar sidebar-shop">
                    <div className="widget widget-clean">
                      <label>Filters:</label>
                      <a href="#" className="sidebar-filter-clear" onClick={handleClearAll}>
                        Clean All
                      </a>
                    </div>
                    <div className="widget widget-collapsible">
                      <h3 className="widget-title">
                        <a
                          data-toggle="collapse"
                          href="#widget-1"
                          role="button"
                          aria-expanded="true"
                          aria-controls="widget-1"
                        >
                          Category
                        </a>
                      </h3>
                      <div className="collapse show" id="widget-1">
                        <div className="widget-body">
                          <div className="filter-items filter-items-count">
                          {categories.map((category) => (
                              <div
                                key={category.id}
                                className={`filter-item ${selectedCategory === category.id ? 'active' : ''}`}
                              >
                                <div
                                  className="custom-control custom-checkbox"
                                  onClick={() => handleCategoryClick(category.id)}
                                >
                                  <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id={`category-${category.id}`}
                                    checked={selectedCategory === category.id}
                                    onChange={() => handleCategoryClick(category.id)}
                                  />
                                  <label className="custom-control-label" htmlFor={`category-${category.id}`}>
                                    {category.name}
                                  </label>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="widget widget-collapsible">
                      <h3 className="widget-title">
                        <a
                          data-toggle="collapse"
                          href="#widget-4"
                          role="button"
                          aria-expanded="true"
                          aria-controls="widget-4"
                        >
                          Brand
                        </a>
                      </h3>
                      <div className="collapse show" id="widget-4">
                        <div className="widget-body">
                          <div className="filter-items filter-items-count">
                            {brands.map((brand) => (
                              <div
                                key={brand.id}
                                className={`filter-item ${selectedCategory === brand.id ? 'active' : ''}`}
                              >
                                <div
                                  className="custom-control custom-checkbox"
                                  onClick={() => handleCategoryClick(brand.id)}
                                >
                                  <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id={`brand-${brand.id}`}
                                    checked={selectedCategory === brand.id}
                                    onChange={() => handleCategoryClick(brand.id)}
                                  />
                                  <label className="custom-control-label" htmlFor={`brand-${brand.id}`}>
                                    {brand.name}
                                  </label>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </main>
      </div>
      <button id="scroll-top" title="Back to Top">
        <i className="icon-arrow-up" />
      </button>
      <Footer />  
    </>
  );
};

export default ProductList;
