import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../components/Admin/Sidebar';

function ViewOrder() {
  const { id } = useParams(); // Lấy id từ URL

  // State để lưu thông tin đơn hàng
  const [order, setOrder] = useState({});

  // Sử dụng useEffect để fetch dữ liệu đơn hàng khi component được render
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:8384/api/orders/${id}`);
        setOrder(response.data);
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };
    fetchOrder();
  }, [id]);

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container">
        <div className="py-4">
          <h2>Order Details</h2>
          <div>
            <p><strong>ID:</strong> {order.id}</p>
            <p><strong>Email:</strong> {order.userId?.email}</p>
            <p><strong>Tên người đặt:</strong> {order.userId?.name}</p>
            <p><strong>Ngày đặt:</strong> {order.createdAt}</p>
            <p><strong>Total Amount:</strong> {order.orderDetail ? order.orderDetail.amount : ''}</p>
            <p><strong>Description:</strong> {order.note}</p>
            <p><strong>Status:</strong> {order.status}</p>
          </div>
          <Link to={`/order/edit-order/${order.id}`} className="btn btn-primary mr-2">Edit</Link>
          <Link to="/order" className="btn btn-secondary">Back</Link>
        </div>
      </div>
    </div>
  );
}

export default ViewOrder;
