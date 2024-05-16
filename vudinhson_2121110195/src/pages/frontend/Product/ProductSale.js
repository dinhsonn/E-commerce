import { useEffect, useState } from "react";
import ProductServices from '../../../services/ProductServices';
import ProductSaleItem from "./ProductSaleItem";

function ProductSale() {
    const [productsales, setProductsales] = useState([]);
    const [productImages, setProductImages] = useState([]);
    const getImgUrl = (imageName) => {
        const endpoint = 'productsale'; 
        return `http://localhost:8384/api/${endpoint}/image/${imageName}`;
      };
      useEffect(() => {
        const fetchData = async () => {
          try {
            const [productsResponse, productImagesResponse] = await Promise.all([
              ProductServices.getProductSale(),
              ProductServices.getProductImage(),
            ]);
    
            const productsData = productsResponse.data.content;
            const productImagesData = productImagesResponse.data.content;
            setProductsales(productsData);
            setProductImages(productImagesData);
      
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);
      const sortedProducts = productsales.sort((a, b) => b.id - a.id);
      const top10Products = sortedProducts.slice(0, 10);
      const combinedData = top10Products.map(product => {
        const correspondingImages = productImages.filter(image => image.productId.id === product.productId.id && image.isPrimary === 1);
        const correspondingImages2 = productImages.filter(image => image.productId.id === product.productId.id && image.isPrimary === 2);
        
        const imageUrls = correspondingImages.map(image => image.image);
        const image2Urls = correspondingImages2.map(image => image.image);
        return {
          ...product,
          image: imageUrls.length > 0 ? imageUrls[0] : null,
          image2: image2Urls.length > 0 ? image2Urls[0] : null,
        };
      });

    
    return ( <>
       <div className="products">
              <div className="row justify-content-center">
              {combinedData.map((combinedItem, index) => (
                    <ProductSaleItem product={combinedItem} key={index} />
                ))}

                {/* End .col-sm-6 col-md-4 col-lg-3 */}
              </div>
              {/* End .row */}
            </div></> );
}

export default ProductSale;