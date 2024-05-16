import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../components/Admin/Sidebar';

function EditOrder() {
  const { id } = useParams(); // Lấy id từ URL
  const navigate = useNavigate(); // Sử dụng hook useHistory để điều hướng sau khi chỉnh sửa

  const [order, setOrder] = useState({});
  const [status, setStatus] = useState('');
  const [statusOptions, setStatusOptions] = useState(['Chờ xác nhận', 'Đã xác nhận']); // Danh sách các tùy chọn cho dropdown

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:8384/api/orders/${id}`);
        setOrder(response.data);
        setStatus(response.data.status);
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };
    fetchOrder();
  }, [id]);

  // Hàm xử lý sự kiện khi thay đổi trạng thái đơn hàng
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  // Hàm xử lý sự kiện khi nhấn nút Lưu
  const handleSave = async () => {
    try {
      // Gửi request để cập nhật trạng thái đơn hàng
      await axios.put(`http://localhost:8384/api/orders/${id}`, {
        status: status,
      });
      // Sau khi cập nhật thành công, điều hướng đến trang danh sách đơn hàng
      navigate('/order');
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container">
        <div className="py-4">
          <h2>Edit Order</h2>
          <div className="form-group">
            <label htmlFor="status">Tình trạng:</label>
            <select
              className="form-control"
              id="status"
              value={status}
              onChange={handleStatusChange}
            >
              {statusOptions.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <button className="btn btn-primary" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default EditOrder;
