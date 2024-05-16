import React, { useEffect, useState } from 'react';
import Header from '../../../components/Public/Header';
import Footer from '../../../components/Public/Footer';
import './profile.css';
import Sidebar from './Sidebar';

const Order = () => {
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    // Sử dụng useEffect để gửi yêu cầu đến API khi component được mount
    fetch('http://localhost:8384/api/orderdetails')
      .then(response => response.json())
      .then(data => {
        setOrderDetails(data.content[0]);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  const getImgUrl = (imageName) => {
    const endpoint = 'productimages'; 
    return `http://localhost:8384/api/${endpoint}/image/${imageName}`;
  };

  if (!orderDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div>
        <Header />
        <div className="profile-container">
            <Sidebar />
            <div>
                <h2>Danh sách đơn hàng</h2>
                {orderDetails.cartItems.map(item => (
                <div className="order-item" key={item.id}>
                    <img src={getImgUrl(item.image)} alt={item.product.title} />
                    <p>Sản phẩm: {item.product.title}</p>
                    <p>Số lượng: {item.quantity}</p>
                    <p>Thành tiền: ${item.product.price}</p>
                    <p>Tình trạng: {item.product.status}</p>
                </div>
                ))}
            </div>
        </div>


      <Footer />
    </div>
  );
};

export default Order;
